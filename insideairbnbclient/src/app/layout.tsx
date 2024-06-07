import './styles/styles.css'

export const metadata = {
  title: 'InsideAirBNB - Paris'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
