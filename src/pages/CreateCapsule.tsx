
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Lock, Upload, Star, Sparkles, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import DrawingCanvas from "@/components/DrawingCanvas";
import { useCreateCapsule } from "@/hooks/useCapsules";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const CreateCapsule = () => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isPrivate, setIsPrivate] = useState(false);
  const [message, setMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("text");
  const [title, setTitle] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const createCapsule = useCreateCapsule();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to upload images.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      console.log('Uploading file:', fileName);

      const { error: uploadError } = await supabase.storage
        .from('capsule-files')
        .upload(fileName, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('capsule-files')
        .getPublicUrl(fileName);

      setUploadedImage(data.publicUrl);
      console.log('File uploaded successfully:', data.publicUrl);

      toast({
        title: 'Image uploaded',
        description: 'Your image has been uploaded successfully.',
      });
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload image. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateCapsule = () => {
    console.log('Creating capsule...');
    
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to create a capsule.',
        variant: 'destructive',
      });
      return;
    }

    if (!selectedDate) {
      toast({
        title: 'Date required',
        description: 'Please select when your capsule should unlock.',
        variant: 'destructive',
      });
      return;
    }

    let content = "";
    let fileUrl = null;

    if (activeTab === "text") {
      if (!message.trim()) {
        toast({
          title: 'Content required',
          description: 'Please write a message for your capsule.',
          variant: 'destructive',
        });
        return;
      }
      content = message;
    } else if (activeTab === "image") {
      if (!uploadedImage) {
        toast({
          title: 'Image required',
          description: 'Please upload an image for your capsule.',
          variant: 'destructive',
        });
        return;
      }
      content = "Image capsule";
      fileUrl = uploadedImage;
    } else if (activeTab === "drawing") {
      content = "Drawing capsule";
      // TODO: Handle drawing data when DrawingCanvas is properly implemented
    }

    const capsuleData = {
      title: title.trim() || null,
      content,
      content_type: activeTab as 'text' | 'image' | 'drawing',
      unlock_date: selectedDate.toISOString(),
      is_private: isPrivate,
      is_locked: true,
      file_url: fileUrl,
    };

    console.log('Capsule data:', capsuleData);
    createCapsule.mutate(capsuleData);
  };

  const resetForm = () => {
    setMessage("");
    setTitle("");
    setUploadedImage(null);
    setSelectedDate(undefined);
    setActiveTab("text");
    setIsPrivate(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md border-lavender-200">
          <CardHeader className="text-center">
            <Lock className="w-12 h-12 text-lavender-500 mx-auto mb-4" />
            <CardTitle>Authentication Required</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-slate-600">You need to be signed in to create a time capsule.</p>
            <Button asChild className="w-full bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600">
              <a href="/auth">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Star className="absolute top-20 right-10 w-4 h-4 text-lavender-400 animate-sparkle" />
        <Sparkles className="absolute top-40 left-20 w-5 h-5 text-peach-400 animate-sparkle delay-1000" />
        <div className="absolute bottom-40 right-40 w-3 h-3 bg-skyblue-300 rounded-full animate-float delay-2000 opacity-60"></div>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Create Your Time Capsule
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Capture this moment and send it to your future self. What would you like to remember?
          </p>
        </div>

        {createCapsule.error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-red-800">
              {createCapsule.error.message || 'Failed to create capsule. Please try again.'}
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Content Creation */}
          <div className="lg:col-span-2">
            <Card className="border-lavender-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-slate-800">
                  <Lock className="w-5 h-5 text-lavender-500" />
                  What would you like to include?
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Title */}
                <div className="mb-6">
                  <Label htmlFor="title" className="text-slate-700">Capsule Title (Optional)</Label>
                  <Textarea
                    id="title"
                    placeholder="Give your capsule a name..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mt-2 resize-none border-lavender-200 focus:border-lavender-400"
                    rows={1}
                  />
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="text">Message</TabsTrigger>
                    <TabsTrigger value="image">Photo</TabsTrigger>
                    <TabsTrigger value="drawing">Drawing</TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="space-y-4">
                    <Label htmlFor="message" className="text-slate-700">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Dear future me..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="min-h-40 resize-none border-lavender-200 focus:border-lavender-400"
                    />
                  </TabsContent>

                  <TabsContent value="image" className="space-y-4">
                    <Label htmlFor="image" className="text-slate-700">Upload a Photo</Label>
                    <div className="border-2 border-dashed border-lavender-300 rounded-lg p-8 text-center hover:border-lavender-400 transition-colors">
                      {uploadedImage ? (
                        <div className="space-y-4">
                          <img src={uploadedImage} alt="Uploaded" className="max-w-full h-48 object-cover rounded-lg mx-auto" />
                          <Button
                            variant="outline"
                            onClick={() => setUploadedImage(null)}
                            className="border-lavender-300 text-lavender-700"
                            disabled={isUploading}
                          >
                            Remove Photo
                          </Button>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-12 h-12 text-lavender-400 mx-auto mb-4" />
                          <p className="text-slate-600 mb-4">
                            {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
                          </p>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                            id="image-upload"
                            disabled={isUploading}
                          />
                          <Button 
                            asChild 
                            variant="outline" 
                            className="border-lavender-300 text-lavender-700"
                            disabled={isUploading}
                          >
                            <label htmlFor="image-upload" className="cursor-pointer">
                              {isUploading ? 'Uploading...' : 'Choose Photo'}
                            </label>
                          </Button>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="drawing" className="space-y-4">
                    <Label className="text-slate-700">Create a Drawing</Label>
                    <div className="border border-lavender-200 rounded-lg p-4">
                      <DrawingCanvas />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Settings Sidebar */}
          <div className="space-y-6">
            {/* Unlock Date */}
            <Card className="border-lavender-200">
              <CardHeader>
                <CardTitle className="text-slate-800">When should it unlock?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-lavender-200",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>

                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000))}
                    className="border-lavender-200 text-lavender-700"
                  >
                    1 Month
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedDate(new Date(Date.now() + 365 * 24 * 60 * 60 * 1000))}
                    className="border-lavender-200 text-lavender-700"
                  >
                    1 Year
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="border-lavender-200">
              <CardHeader>
                <CardTitle className="text-slate-800">Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="privacy">Private Capsule</Label>
                    <p className="text-sm text-slate-600">Only you can see this capsule</p>
                  </div>
                  <Switch
                    id="privacy"
                    checked={isPrivate}
                    onCheckedChange={setIsPrivate}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-4">
              <Button 
                onClick={handleCreateCapsule}
                disabled={!selectedDate || createCapsule.isPending || isUploading}
                className="w-full bg-gradient-to-r from-lavender-500 to-skyblue-500 hover:from-lavender-600 hover:to-skyblue-600 text-white py-6 text-lg font-medium"
                size="lg"
              >
                <Lock className="w-5 h-5 mr-2" />
                {createCapsule.isPending ? 'Creating...' : 'Lock My Capsule'}
              </Button>

              <Button 
                onClick={resetForm}
                variant="outline"
                className="w-full border-lavender-200 text-lavender-700"
                disabled={createCapsule.isPending}
              >
                Reset Form
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCapsule;
