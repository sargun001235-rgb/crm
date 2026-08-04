"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useState, useEffect } from "react";

export default function SettingsPage() {
  const settings = useSettingsStore();
  const [isMounted, setIsMounted] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [storeName, setStoreName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [gstin, setGstin] = useState("");

  useEffect(() => {
    setIsMounted(true);
    setFirstName(settings.firstName);
    setLastName(settings.lastName);
    setStoreName(settings.storeName);
    setAddress(settings.address);
    setPhone(settings.phone);
    setGstin(settings.gstin);
  }, [settings]);

  if (!isMounted) return null; // Avoid hydration mismatch

  const handleSaveProfile = () => {
    settings.updateProfile({ firstName, lastName });
    alert("Profile saved successfully!");
  };

  const handleSaveStore = () => {
    settings.updateStoreDetails({ storeName, address, phone, gstin });
    alert("Store details saved successfully!");
  };
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your store preferences and account settings.
        </p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
          <TabsTrigger 
            value="general" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
          >
            General
          </TabsTrigger>
          <TabsTrigger 
            value="store" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
          >
            Store Details
          </TabsTrigger>
          <TabsTrigger 
            value="billing" 
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
          >
            Billing
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="admin@amritsareyewears.com" disabled />
              </div>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="store" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>Update your store details for invoices and receipts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Store Name</Label>
                <Input value={storeName} onChange={(e) => setStoreName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>GSTIN</Label>
                  <Input value={gstin} onChange={(e) => setGstin(e.target.value)} />
                </div>
              </div>
              <Button onClick={handleSaveStore}>Save Store Details</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6 space-y-6">
           <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
              <CardDescription>Manage your Lumière Optics SaaS subscription.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="p-4 bg-primary/10 rounded-lg flex justify-between items-center border border-primary/20">
                  <div>
                    <h3 className="font-bold text-lg text-primary">Pro Plan</h3>
                    <p className="text-sm text-muted-foreground">Active until Dec 31, 2026</p>
                  </div>
                  <Button variant="outline">Manage Subscription</Button>
               </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
