'use client';

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form/form";
import { Input } from "@/components/ui/input/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/form/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/form/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/form/select";
import { Textarea } from "@/components/ui/form/textarea";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  bio: z.string().min(10, {
    message: "Bio must be at least 10 characters.",
  }),
  role: z.string({
    required_error: "Please select a role.",
  }),
  notifications: z.boolean().default(false),
  contactPreference: z.enum(["email", "phone", "mail"], {
    required_error: "Please select a contact preference.",
  }),
});

export default function FormsShowcase() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      bio: "",
      notifications: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="container mx-auto p-8 space-y-12">
      <div>
        <h1 className="text-3xl font-bold mb-4">Form Components</h1>
        <p className="text-muted-foreground">
          Components for building forms and collecting user input.
        </p>
      </div>

      {/* Select Component Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Select</h2>
          <p className="text-muted-foreground mb-6">
            Select components allow users to choose a single value from a list of options.
          </p>
        </div>

        <div className="grid gap-8">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Basic Usage</h3>
            <div className="flex flex-wrap gap-4">
              <div className="w-[180px]">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a fruit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">With Groups</h3>
            <div className="flex flex-wrap gap-4">
              <div className="w-[240px]">
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a food" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Fruits</SelectLabel>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                      <SelectItem value="orange">Orange</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Vegetables</SelectLabel>
                      <SelectItem value="carrot">Carrot</SelectItem>
                      <SelectItem value="potato">Potato</SelectItem>
                      <SelectItem value="tomato">Tomato</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Fields Section */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Form Fields</h2>
          <p className="text-muted-foreground mb-6">
            A collection of form fields with validation and error handling.
          </p>
        </div>

        <div className="max-w-md">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Text Input */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Input */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormDescription>
                      We'll never share your email with anyone else.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Input */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters long.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Textarea */}
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Tell us about yourself" {...field} />
                    </FormControl>
                    <FormDescription>
                      A brief description about yourself.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Select */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="user">Regular User</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Select your account type.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Radio Group */}
              <FormField
                control={form.control}
                name="contactPreference"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Contact Preference</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="email" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Email
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="phone" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Phone
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="mail" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Mail
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Checkbox */}
              <FormField
                control={form.control}
                name="notifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Email Notifications
                      </FormLabel>
                      <FormDescription>
                        Receive emails about your account activity.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </section>
    </div>
  );
} 