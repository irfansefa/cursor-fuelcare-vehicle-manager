'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft } from "react-icons/fi";

export default function TypographyShowcase() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Showcase
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Typography</h1>

      <div className="space-y-12">
        {/* Primary Font - Inter */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Primary Font - Inter</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="font-light mb-2">Light (300)</p>
              <p className="font-light text-lg">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-normal mb-2">Regular (400)</p>
              <p className="font-normal text-lg">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-medium mb-2">Medium (500)</p>
              <p className="font-medium text-lg">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-semibold mb-2">Semibold (600)</p>
              <p className="font-semibold text-lg">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="font-bold mb-2">Bold (700)</p>
              <p className="font-bold text-lg">The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
        </section>

        {/* Font Sizes */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Font Sizes</h2>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="text-xs mb-2">Extra Small (xs)</p>
              <p className="text-xs">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-sm mb-2">Small (sm)</p>
              <p className="text-sm">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-base mb-2">Base (base)</p>
              <p className="text-base">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-lg mb-2">Large (lg)</p>
              <p className="text-lg">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-xl mb-2">Extra Large (xl)</p>
              <p className="text-xl">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-2xl mb-2">2XL (2xl)</p>
              <p className="text-2xl">The quick brown fox jumps over the lazy dog</p>
            </div>
            <div className="p-4 border rounded-lg">
              <p className="text-3xl mb-2">3XL (3xl)</p>
              <p className="text-3xl">The quick brown fox jumps over the lazy dog</p>
            </div>
          </div>
        </section>

        {/* Headings Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Headings</h2>
          <div className="space-y-4">
            <div>
              <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Heading 1
              </h1>
              <code className="text-sm text-muted-foreground">text-4xl/text-5xl font-extrabold</code>
            </div>
            <div>
              <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
                Heading 2
              </h2>
              <code className="text-sm text-muted-foreground">text-3xl font-semibold</code>
            </div>
            <div>
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Heading 3
              </h3>
              <code className="text-sm text-muted-foreground">text-2xl font-semibold</code>
            </div>
            <div>
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Heading 4
              </h4>
              <code className="text-sm text-muted-foreground">text-xl font-semibold</code>
            </div>
          </div>
        </section>

        {/* Paragraph Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Paragraphs</h2>
          <div className="space-y-4">
            <div>
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                The king, seeing how much happier his subjects were, realized the error of his ways and promised to rule with justice and compassion.
              </p>
              <code className="text-sm text-muted-foreground">leading-7</code>
            </div>
            <div>
              <p className="text-xl text-muted-foreground">
                The king, seeing how much happier his subjects were, realized the error of his ways and promised to rule with justice and compassion.
              </p>
              <code className="text-sm text-muted-foreground">text-xl text-muted-foreground</code>
            </div>
          </div>
        </section>

        {/* Inline Text Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Inline Text</h2>
          <div className="space-y-4">
            <div>
              <p className="leading-7">
                This is a paragraph with <strong>bold text</strong>, <em>italic text</em>, and <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">inline code</code>.
              </p>
            </div>
            <div>
              <p className="leading-7">
                Text can be <span className="underline">underlined</span>, <span className="line-through">strikethrough</span>, or <span className="font-semibold">semibold</span>.
              </p>
            </div>
          </div>
        </section>

        {/* Lists Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Lists</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-lg font-medium mb-4">Unordered List</h3>
              <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Ordered List</h3>
              <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">
                <li>First item</li>
                <li>Second item</li>
                <li>Third item</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Blockquote Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Blockquote</h2>
          <blockquote className="mt-6 border-l-2 pl-6 italic">
            "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the privilege of hearing one."
          </blockquote>
        </section>

        {/* Code Example */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>
          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
            <pre className="text-sm">
              {`// Heading Example
<h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
  Heading 1
</h1>

// Paragraph Example
<p className="leading-7 [&:not(:first-child)]:mt-6">
  Your paragraph text here...
</p>

// List Example
<ul className="my-6 ml-6 list-disc [&>li]:mt-2">
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ul>

// Blockquote Example
<blockquote className="mt-6 border-l-2 pl-6 italic">
  Your quote here...
</blockquote>`}
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
} 