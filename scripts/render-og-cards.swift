import AppKit
import Foundation

struct Card: Decodable {
    let id: String
    let line: String
    let name: String
    let spec: String
    let detail: String
    let image: String
}

guard CommandLine.arguments.count == 5 else {
    fputs("Usage: swift render-og-cards.swift <root> <background> <output-dir> <cards-json>\n", stderr)
    exit(1)
}

let root = CommandLine.arguments[1]
let backgroundPath = CommandLine.arguments[2]
let outputDirectory = CommandLine.arguments[3]
let cardsData = Data(CommandLine.arguments[4].utf8)
let cards = try JSONDecoder().decode([Card].self, from: cardsData)

let canvasWidth = 1200
let canvasHeight = 630
let canvasSize = NSSize(width: canvasWidth, height: canvasHeight)

func color(_ hex: UInt32, alpha: CGFloat = 1) -> NSColor {
    NSColor(
        red: CGFloat((hex >> 16) & 0xff) / 255,
        green: CGFloat((hex >> 8) & 0xff) / 255,
        blue: CGFloat(hex & 0xff) / 255,
        alpha: alpha
    )
}

func rectFromTop(x: CGFloat, y: CGFloat, width: CGFloat, height: CGFloat) -> NSRect {
    NSRect(x: x, y: CGFloat(canvasHeight) - y - height, width: width, height: height)
}

func aspectFillSourceRect(image: NSImage, destination: NSRect) -> NSRect {
    let sourceRatio = image.size.width / image.size.height
    let destinationRatio = destination.width / destination.height
    if sourceRatio > destinationRatio {
        let width = image.size.height * destinationRatio
        return NSRect(x: (image.size.width - width) / 2, y: 0, width: width, height: image.size.height)
    }
    let height = image.size.width / destinationRatio
    return NSRect(x: 0, y: (image.size.height - height) / 2, width: image.size.width, height: height)
}

func drawText(_ value: String, x: CGFloat, top: CGFloat, size: CGFloat, bold: Bool, fill: NSColor) {
    let font = NSFont(name: bold ? "Verdana-Bold" : "Verdana", size: size)
        ?? (bold ? NSFont.boldSystemFont(ofSize: size) : NSFont.systemFont(ofSize: size))
    let paragraph = NSMutableParagraphStyle()
    paragraph.lineBreakMode = .byClipping
    (value as NSString).draw(
        in: rectFromTop(x: x, y: top, width: 610, height: size * 1.35),
        withAttributes: [
            .font: font,
            .foregroundColor: fill,
            .paragraphStyle: paragraph,
        ]
    )
}

guard let background = NSImage(contentsOfFile: backgroundPath) else {
    fputs("Unable to load background: \(backgroundPath)\n", stderr)
    exit(1)
}

try FileManager.default.createDirectory(
    at: URL(fileURLWithPath: outputDirectory),
    withIntermediateDirectories: true
)

for card in cards {
    guard let product = NSImage(contentsOfFile: root + "/" + card.image) else {
        fputs("Unable to load product image: \(card.image)\n", stderr)
        exit(1)
    }
    guard let bitmap = NSBitmapImageRep(
        bitmapDataPlanes: nil,
        pixelsWide: canvasWidth,
        pixelsHigh: canvasHeight,
        bitsPerSample: 8,
        samplesPerPixel: 4,
        hasAlpha: true,
        isPlanar: false,
        colorSpaceName: .deviceRGB,
        bytesPerRow: 0,
        bitsPerPixel: 0
    ) else {
        fatalError("Unable to create bitmap")
    }
    bitmap.size = canvasSize
    guard let context = NSGraphicsContext(bitmapImageRep: bitmap) else {
        fatalError("Unable to create graphics context")
    }

    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = context
    context.imageInterpolation = .high

    let fullCanvas = NSRect(origin: .zero, size: canvasSize)
    background.draw(
        in: fullCanvas,
        from: aspectFillSourceRect(image: background, destination: fullCanvas),
        operation: .copy,
        fraction: 1
    )

    let cardRect = rectFromTop(x: 700, y: 45, width: 450, height: 540)
    let shadow = NSShadow()
    shadow.shadowColor = NSColor.black.withAlphaComponent(0.35)
    shadow.shadowBlurRadius = 20
    shadow.shadowOffset = NSSize(width: 0, height: -8)
    shadow.set()
    color(0xffffff, alpha: 0.97).setFill()
    NSBezierPath(roundedRect: cardRect, xRadius: 24, yRadius: 24).fill()

    NSGraphicsContext.restoreGraphicsState()
    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = context
    context.imageInterpolation = .high

    color(0x68c143).setFill()
    NSBezierPath(roundedRect: rectFromTop(x: 64, y: 100, width: 76, height: 6), xRadius: 3, yRadius: 3).fill()

    drawText("SPIDER ENERGY", x: 64, top: 52, size: 23, bold: true, fill: color(0x7ee35a))
    drawText(card.line, x: 64, top: 132, size: 19, bold: true, fill: color(0xaed7ff))
    drawText(card.name, x: 64, top: 190, size: 48, bold: true, fill: .white)
    drawText(card.spec, x: 64, top: 270, size: 62, bold: true, fill: color(0x7ee35a))
    drawText(card.detail, x: 64, top: 365, size: 23, bold: false, fill: color(0xdcecff))
    drawText("spiderenergy.in", x: 64, top: 545, size: 18, bold: false, fill: color(0xb8c9e8))

    let productBounds = rectFromTop(x: 730, y: 85, width: 390, height: 460)
    let scale = min(productBounds.width / product.size.width, productBounds.height / product.size.height)
    let fittedSize = NSSize(width: product.size.width * scale, height: product.size.height * scale)
    let fittedRect = NSRect(
        x: productBounds.midX - fittedSize.width / 2,
        y: productBounds.midY - fittedSize.height / 2,
        width: fittedSize.width,
        height: fittedSize.height
    )
    product.draw(in: fittedRect, from: .zero, operation: .sourceOver, fraction: 1)

    NSGraphicsContext.restoreGraphicsState()

    guard let jpeg = bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.9]) else {
        fatalError("Unable to encode JPEG")
    }
    try jpeg.write(to: URL(fileURLWithPath: outputDirectory + "/" + card.id + ".jpg"))
    print("Generated \(card.id).jpg")
}

print("Generated \(cards.count) Open Graph assets in \(outputDirectory)")
