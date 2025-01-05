'use client';

import React from 'react';
import Link from 'next/link';
import { FiArrowLeft } from "react-icons/fi"

import { Button } from "@/components/ui/button/button"
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from "@/components/ui/modal/modal"

export default function ModalsShowcase() {
  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <Link href="/showcase" className="inline-flex items-center text-muted-foreground hover:text-foreground">
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back to Showcase
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Modal Components</h1>

      {/* Basic Modal Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Basic Modal</h2>
        <div className="space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Default Modal</h3>
            <Modal>
              <ModalTrigger asChild>
                <Button>Open Modal</Button>
              </ModalTrigger>
              <ModalContent>
                <ModalHeader>
                  <ModalTitle>Modal Title</ModalTitle>
                  <ModalDescription>
                    This is a basic modal with a title and description.
                  </ModalDescription>
                </ModalHeader>
                <div className="py-4">
                  Modal content goes here...
                </div>
                <ModalFooter>
                  <Button variant="outline">Cancel</Button>
                  <Button>Continue</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        </div>
      </section>

      {/* Modal Sizes Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Modal Sizes</h2>
        <div className="flex flex-wrap gap-4">
          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline">Small Modal</Button>
            </ModalTrigger>
            <ModalContent size="sm">
              <ModalHeader>
                <ModalTitle>Small Modal</ModalTitle>
                <ModalDescription>
                  This is a small-sized modal dialog.
                </ModalDescription>
              </ModalHeader>
              <div className="py-4">
                Content for small modal...
              </div>
              <ModalFooter>
                <Button>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline">Large Modal</Button>
            </ModalTrigger>
            <ModalContent size="lg">
              <ModalHeader>
                <ModalTitle>Large Modal</ModalTitle>
                <ModalDescription>
                  This is a large-sized modal dialog.
                </ModalDescription>
              </ModalHeader>
              <div className="py-4">
                Content for large modal...
              </div>
              <ModalFooter>
                <Button>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline">Extra Large Modal</Button>
            </ModalTrigger>
            <ModalContent size="xl">
              <ModalHeader>
                <ModalTitle>Extra Large Modal</ModalTitle>
                <ModalDescription>
                  This is an extra large-sized modal dialog.
                </ModalDescription>
              </ModalHeader>
              <div className="py-4">
                Content for extra large modal...
              </div>
              <ModalFooter>
                <Button>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Modal>
            <ModalTrigger asChild>
              <Button variant="outline">Full Width Modal</Button>
            </ModalTrigger>
            <ModalContent size="full">
              <ModalHeader>
                <ModalTitle>Full Width Modal</ModalTitle>
                <ModalDescription>
                  This is a full-width modal dialog.
                </ModalDescription>
              </ModalHeader>
              <div className="py-4">
                Content for full-width modal...
              </div>
              <ModalFooter>
                <Button>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </section>

      {/* Modal Without Close Button */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Modal Without Close Button</h2>
        <div className="space-y-4">
          <Modal>
            <ModalTrigger asChild>
              <Button>Open Modal</Button>
            </ModalTrigger>
            <ModalContent showClose={false}>
              <ModalHeader>
                <ModalTitle>No Close Button</ModalTitle>
                <ModalDescription>
                  This modal doesn't have a close button in the corner.
                </ModalDescription>
              </ModalHeader>
              <div className="py-4">
                Modal content goes here...
              </div>
              <ModalFooter>
                <ModalTrigger asChild>
                  <Button>Close Modal</Button>
                </ModalTrigger>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </section>

      {/* Code Example */}
      <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-md">
        <pre className="text-sm">
          {`// Basic Modal Example
<Modal>
  <ModalTrigger asChild>
    <Button>Open Modal</Button>
  </ModalTrigger>
  <ModalContent>
    <ModalHeader>
      <ModalTitle>Modal Title</ModalTitle>
      <ModalDescription>
        Modal description goes here.
      </ModalDescription>
    </ModalHeader>
    <div className="py-4">
      Modal content...
    </div>
    <ModalFooter>
      <Button variant="outline">Cancel</Button>
      <Button>Continue</Button>
    </ModalFooter>
  </ModalContent>
</Modal>

// Modal Size Example
<Modal>
  <ModalTrigger asChild>
    <Button>Open Large Modal</Button>
  </ModalTrigger>
  <ModalContent size="lg">
    <ModalHeader>
      <ModalTitle>Large Modal</ModalTitle>
    </ModalHeader>
    Content...
  </ModalContent>
</Modal>`}
        </pre>
      </div>
    </div>
  )
} 