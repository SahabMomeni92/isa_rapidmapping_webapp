import subprocess
import os
replica_sync_command = f"C:\\Python27\\ArcGIS10.5\\python.exe c:\\test.py 23"
python2_env = os.environ.copy()
python2_env.update({"PATH": "C:\\Python27\\ArcGIS10.5"})
run_sync = subprocess.run(replica_sync_command.split(), env=python2_env, stdout=subprocess.PIPE, stderr=subprocess.PIPE, universal_newlines=True
                          ,text=True,input='salam')
