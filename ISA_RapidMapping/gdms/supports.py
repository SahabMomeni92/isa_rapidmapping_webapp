import os
from tempfile import mkstemp
from typing import Dict
from zipfile import ZipFile
from osgeo import gdal 
# in method komak mikone ke client majboor nabashe shp file haro zip kone 
def prepare_zip_file(name , data):
    
    fd, path = mkstemp()
    zip_file = ZipFile(path, "w", allowZip64=True)
    # print(fd, path, zip_file, data)
    for ext, stream in data.items():
        fname = "{}.{}".format(name, ext)
        if isinstance(stream, str):
            zip_file.write(stream, fname)
        else:
            zip_file.writestr(fname, stream.read())
    zip_file.close()
    os.close(fd)
    return path

def Create_valid_zip_file_name(name,data_file):

    with ZipFile(data_file, 'r') as zip_ref:
            for file in zip_ref.infolist():
                split_name = file.filename.split('.') 
                os.rename(file.filename,'{}{}'.format(name,split_name[1]))
        