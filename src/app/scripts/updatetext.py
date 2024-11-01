import bpy
import sys

def update_intro_text(new_text):
    text_object = bpy.data.objects.get("TextObject")
    if text_object and text_object.type == 'FONT':
        text_object.data.body = new_text
        print(f"Updated text to: {new_text}")
    else:
        print("Text object not found!")

if __name__ == "__main__":
    args = sys.argv
    if len(args) > 1:
        new_text = args[1]
        update_intro_text(new_text)
    else:
        print("No text provided.")
