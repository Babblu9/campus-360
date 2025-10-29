"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

interface QRScannerProps {
  onScan: (data: string) => void
  isScanning: boolean
}

export function QRScanner({ onScan, isScanning }: QRScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!isScanning) return

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
        }

        // Start QR code detection
        const scanInterval = setInterval(() => {
          if (videoRef.current && canvasRef.current) {
            const context = canvasRef.current.getContext("2d")
            if (context) {
              canvasRef.current.width = videoRef.current.videoWidth
              canvasRef.current.height = videoRef.current.videoHeight
              context.drawImage(videoRef.current, 0, 0)

              // Simulate QR code detection
              // In production, use a library like jsQR or qr-scanner
              const imageData = context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height)
              // QR detection logic would go here
            }
          }
        }, 500)

        return () => {
          clearInterval(scanInterval)
          stream.getTracks().forEach((track) => track.stop())
        }
      } catch (err) {
        setError("Unable to access camera. Please check permissions.")
        console.error("Camera error:", err)
      }
    }

    const cleanup = startCamera()
    return () => {
      cleanup?.then((fn) => fn?.())
    }
  }, [isScanning])

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
          <video ref={videoRef} className="w-full h-full object-cover" playsInline muted autoPlay />
          <canvas ref={canvasRef} className="hidden" />

          {/* QR Scanner Frame */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 border-2 border-primary rounded-lg opacity-50"></div>
          </div>

          {/* Scanning Indicator */}
          {isScanning && (
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-primary/90 text-primary-foreground px-3 py-2 rounded-lg text-sm font-medium">
              <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
              Scanning...
            </div>
          )}
        </div>
      </Card>

      {error && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  )
}
