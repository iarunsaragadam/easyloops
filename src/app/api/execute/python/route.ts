import { NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import { randomUUID } from "crypto";
import * as fs from "fs/promises";
import * as path from "path";
import * as os from "os";

export const dynamic = "force-dynamic";

const execAsync = promisify(exec);

export async function POST(request: Request) {
  try {
    const { code, input } = await request.json();
    console.log("Python API received code:", code.substring(0, 100) + "...");
    console.log("Python API received input:", input);

    if (!code) {
      return NextResponse.json({ error: "No code provided" }, { status: 400 });
    }

    // Create a temporary directory for the Python code
    const tempDir = path.join(os.tmpdir(), randomUUID());
    await fs.mkdir(tempDir, { recursive: true });
    console.log("Created temp directory:", tempDir);

    // Write the Python code to a file
    const pythonFilePath = path.join(tempDir, "main.py");
    await fs.writeFile(pythonFilePath, code);
    console.log("Wrote code to file:", pythonFilePath);

    // If input is provided, write it to a file
    let command = `cd ${tempDir} && python3 main.py`;
    if (input) {
      const inputFilePath = path.join(tempDir, "input.txt");
      await fs.writeFile(inputFilePath, input);
      command = `cd ${tempDir} && cat input.txt | python3 main.py`;
      console.log("Wrote input to file:", inputFilePath);
    }

    console.log("Executing command:", command);

    // Run the Python code
    const { stdout, stderr } = await execAsync(
      command,
      { timeout: 10000 } // 10 second timeout
    );

    // Clean up
    await fs.rm(tempDir, { recursive: true, force: true });

    return NextResponse.json({
      output: stdout,
      error: stderr,
      success: !stderr,
    });
  } catch (error) {
    console.error("Error executing Python code:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message.includes("Command failed")
              ? `Execution error: ${error.message
                  .split("\n")
                  .slice(1)
                  .join("\n")}`
              : error.message
            : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}
