import sys

try:
    from PIL import Image
    
    img = Image.open('logo.png').convert('RGBA')
    datas = img.getdata()
    
    # Target color: #e8caa1 (232, 202, 161)
    new_data = []
    for item in datas:
        # Check if the pixel is white-ish (background)
        # item is (R, G, B, A)
        if item[0] > 200 and item[1] > 200 and item[2] > 200:
            # Change white to transparent
            new_data.append((255, 255, 255, 0))
        else:
            # Change non-white (black/gray text) to Gold
            # We can preserve alpha or edges by blending
            gray = (item[0] + item[1] + item[2]) / 3
            # If it's a dark color, make it solid gold
            alpha = int(255 - gray) # 0 if white, 255 if black
            new_data.append((232, 202, 161, alpha))
            
    img.putdata(new_data)
    img.save('logo_gold.png', 'PNG')
    print("Logo processed successfully via Pillow.")
except ImportError:
    print("Pillow not installed. Skipping local convert.")
