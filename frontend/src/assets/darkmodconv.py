from PIL import Image, ImageEnhance, ImageOps

input_path = "bin_icon.png"
output_path = "bin_icon_dark.png"

image = Image.open(input_path)

image = image.convert("RGBA")
r, g, b, a = image.split()

rgb_image = Image.merge("RGB", (r, g, b))
inverted_image = ImageOps.invert(rgb_image)
inverted_image = Image.merge("RGBA", (inverted_image.getchannel("R"), 
                                      inverted_image.getchannel("G"), 
                                      inverted_image.getchannel("B"), 
                                      a))

inverted_image.save(output_path)
output_path
