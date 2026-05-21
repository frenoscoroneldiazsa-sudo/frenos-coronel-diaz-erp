from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "web" / "assets" / "inicio"
ASSETS.mkdir(parents=True, exist_ok=True)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        "C:/Windows/Fonts/arialbd.ttf" if bold else "C:/Windows/Fonts/arial.ttf",
        "C:/Windows/Fonts/segoeuib.ttf" if bold else "C:/Windows/Fonts/segoeui.ttf",
    ]
    for candidate in candidates:
        if Path(candidate).exists():
            return ImageFont.truetype(candidate, size)
    return ImageFont.load_default()


def draw_disc(draw: ImageDraw.ImageDraw, cx: int, cy: int, r: int) -> None:
    draw.ellipse((cx - r, cy - r, cx + r, cy + r), fill=(226, 232, 240), outline=(148, 163, 184), width=6)
    draw.ellipse((cx - r // 3, cy - r // 3, cx + r // 3, cy + r // 3), fill=(15, 23, 42))
    for dx, dy in [(-35, -35), (35, -35), (-35, 35), (35, 35)]:
        draw.ellipse((cx + dx - 8, cy + dy - 8, cx + dx + 8, cy + dy + 8), fill=(100, 116, 139))


def draw_caliper(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    draw.rounded_rectangle((x, y, x + 150, y + 78), radius=22, fill=(203, 18, 38))
    draw.rounded_rectangle((x + 22, y + 18, x + 128, y + 60), radius=16, fill=(248, 250, 252))
    draw.rounded_rectangle((x + 44, y + 28, x + 106, y + 50), radius=10, fill=(203, 18, 38))


def draw_hose(draw: ImageDraw.ImageDraw, x: int, y: int) -> None:
    points = [(x, y + 55), (x + 50, y), (x + 115, y + 95), (x + 180, y + 30), (x + 240, y + 70)]
    draw.line(points, fill=(15, 118, 110), width=16, joint="curve")
    draw.line(points, fill=(15, 23, 42), width=6, joint="curve")
    draw.rectangle((x - 18, y + 42, x + 22, y + 68), fill=(226, 232, 240))
    draw.rectangle((x + 220, y + 57, x + 262, y + 83), fill=(226, 232, 240))


def make_card(filename: str, title: str, subtitle: str, accent: tuple[int, int, int], kind: str) -> None:
    img = Image.new("RGB", (640, 360), (15, 23, 42))
    draw = ImageDraw.Draw(img)
    for i in range(360):
        ratio = i / 360
        color = (
            int(15 + accent[0] * ratio * 0.28),
            int(23 + accent[1] * ratio * 0.18),
            int(42 + accent[2] * ratio * 0.12),
        )
        draw.line((0, i, 640, i), fill=color)
    draw.rectangle((0, 0, 640, 360), outline=(255, 255, 255), width=2)

    if kind == "disc":
        draw_disc(draw, 470, 160, 92)
        draw_caliper(draw, 365, 105)
    elif kind == "hose":
        draw_hose(draw, 330, 110)
    elif kind == "box":
        draw.rounded_rectangle((365, 90, 555, 230), radius=18, fill=(226, 232, 240))
        draw.rectangle((386, 122, 534, 160), fill=accent)
        draw.text((404, 174), "STOCK", fill=(15, 23, 42), font=font(28, True))
    else:
        draw_disc(draw, 470, 160, 86)

    draw.text((36, 42), title.upper(), fill=(255, 255, 255), font=font(36, True))
    draw.text((38, 96), subtitle, fill=(203, 213, 225), font=font(20))
    draw.rounded_rectangle((38, 260, 220, 306), radius=8, fill=accent)
    draw.text((58, 270), "VER CATALOGO", fill=(255, 255, 255), font=font(16, True))
    img.save(ASSETS / filename, "PNG", optimize=True)


def main() -> None:
    make_card("hidraulica.png", "Hidraulica", "Bombas, bombines y cilindros", (15, 118, 110), "disc")
    make_card("friccion.png", "Friccion", "Pastillas, discos y campanas", (203, 18, 38), "disc")
    make_card("flexibles.png", "Canos flexibles", "Aplicaciones por modelo y medida", (30, 64, 175), "hose")
    make_card("servos.png", "Servos y caliper", "Repuestos, reparaciones y conjuntos", (124, 58, 237), "box")
    make_card("chaja.png", "Chaja conexiones", "Conectores, resortes y accesorios", (234, 88, 12), "box")
    make_card("embragues.png", "Embragues", "Bombas, bombines y crapodinas", (8, 145, 178), "hose")


if __name__ == "__main__":
    main()
