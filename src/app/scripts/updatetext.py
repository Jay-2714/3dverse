import bpy
import sys

text_obj = bpy.data.objects.get('Text')
if text_obj:
    text_obj.data.body = ''
    