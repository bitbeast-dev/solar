"use client";
import React from "react";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>E-commerce Store</title>
        <meta name="description" content="Desktop E-commerce Homepage" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
