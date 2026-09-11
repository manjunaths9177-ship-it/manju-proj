import subprocess
import sys
import time
import os

print("=" * 65)
print("  🚀 SLN PROPERTIES - FULL STACK PYTHON & REACT LAUNCHER")
print("=" * 65)
print("• Backend: Python (Flask + SQLite) -> http://localhost:5000")
print("• Frontend: React (Vite) -> http://localhost:5173")
print("• Contact Info: +91 9742568746 | manjunaths9177@gmail.com")
print("=" * 65)

# Path to python script & npm
base_dir = os.path.dirname(os.path.abspath(__file__))
backend_script = os.path.join(base_dir, 'server', 'app.py')

processes = []

try:
    # 1. Launch Python Server
    print("\n[1/2] Starting Python Flask Server on http://localhost:5000...")
    p_backend = subprocess.Popen([sys.executable, backend_script], cwd=base_dir)
    processes.append(p_backend)
    time.sleep(2)

    # 2. Launch Vite React Frontend
    print("[2/2] Starting Vite React Web Server on http://localhost:5173...")
    npm_cmd = 'npm.cmd' if os.name == 'nt' else 'npm'
    p_frontend = subprocess.Popen([npm_cmd, 'run', 'dev'], cwd=base_dir)
    processes.append(p_frontend)

    print("\n✅ Both Servers are Running!")
    print("👉 Open http://localhost:5173/ in your browser (Mobile & Desktop ready)")
    print("Press CTRL+C in this terminal to stop both servers anytime.\n")

    p_backend.wait()
    p_frontend.wait()

except KeyboardInterrupt:
    print("\nShutting down SLN Properties servers...")
    for p in processes:
        p.terminate()
    print("Shutdown complete.")
