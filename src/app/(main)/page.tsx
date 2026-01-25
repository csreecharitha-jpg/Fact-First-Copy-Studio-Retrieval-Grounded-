'use client';

import type { GenerateCopyOutput } from '@/ai/flows/generate-copy';
import { generateCopyAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, FileText, CheckCircle, HelpCircle, FileCheck2 } from 'lucide-react';
import { useState, useTransition } from 'react';

type ContentType = 'Blog Post' | 'Social Media' | 'Ad Copy' | 'Email' | 'Product Description' | 'Education';

export default function HomePage() {
  const [isPending, startTransition] = useTransition();
  const [sourceMaterial, setSourceMaterial] = useState('');
  const [prompt, setPrompt] = useState('');
  const [contentType, setContentType] = useState<ContentType>('Blog Post');
  const [result, setResult] = useState<GenerateCopyOutput | null>(null);
  const { toast } = useToast();



  const handleGenerateCopy = () => {
    if (result) {
      setResult(null);
      setPrompt('');
      return;
    }

    startTransition(async () => {
      const response = await generateCopyAction({
        sourceMaterial,
        prompt,
        contentType,
      });
      if ('error' in response) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: response.error,
        });
      } else {
        setResult(response);
      }
    });
  };

  const confidenceColors = {
    High: 'text-green-600 dark:text-green-400',
    Medium: 'text-yellow-600 dark:text-yellow-400',
    Low: 'text-red-600 dark:text-red-400',
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
            <FileCheck2 className="h-8 w-8 text-primary" />
            Fact-First Copy Studio
          </h1>
          <p className="text-muted-foreground">
            Generate marketing copy grounded in verified facts. Paste your source material, then create content with full citation tracking.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Left Column: Input & Controls */}
          <div className="space-y-6">
            {/* Source Material Input */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Source Material</CardTitle>
                <CardDescription>
                  Enter factual information to use as the foundation for your content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste facts, data, product information, company details, etc..."
                  className="min-h-[200px] text-base resize-y"
                  value={sourceMaterial}
                  onChange={(e) => setSourceMaterial(e.target.value)}
                  disabled={isPending}
                />
              </CardContent>
            </Card>

            {/* Generation Controls */}
            {!result && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Generate Copy</CardTitle>
                  <CardDescription>
                    Describe what content you want to create
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content-type">Content Type</Label>
                    <Select value={contentType} onValueChange={(val) => setContentType(val as ContentType)}>
                      <SelectTrigger id="content-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Blog Post">Blog Post</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Ad Copy">Ad Copy</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Product Description">Product Description</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prompt">Your Prompt</Label>
                    <Textarea
                      id="prompt"
                      placeholder="E.g., 'Write a blog post introducing our new eco-friendly product line'"
                      className="min-h-[100px] text-base"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      disabled={isPending}
                    />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleGenerateCopy}
                    disabled={isPending || sourceMaterial.length < 50 || prompt.length < 10}
                    className="w-full"
                    size="lg"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate Fact-Grounded Copy
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>

          {/* Right Column: Generated Output */}
          <div>
            {result ? (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <Sparkles className="h-6 w-6 text-primary" />
                    Generated {contentType}
                  </CardTitle>
                  <CardDescription>
                    All content is grounded in your source material
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6 animate-in fade-in">
                    {/* Generated Copy */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2">Copy</h3>
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <p className="text-foreground whitespace-pre-wrap leading-relaxed">
                          {result.generatedCopy}
                        </p>
                      </div>
                    </div>

                    {/* Confidence Level */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <HelpCircle size={20} />
                        Confidence Level
                      </h3>
                      <p className={`font-bold text-xl ${confidenceColors[result.confidenceLevel]}`}>
                        {result.confidenceLevel}
                      </p>
                    </div>

                    {/* Facts Used */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <FileText size={20} />
                        Facts Used
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-foreground/80">
                        {result.factsUsed.map((fact, index) => (
                          <li key={index} className="text-sm">
                            {fact}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Sources */}
                    <div>
                      <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                        <CheckCircle size={20} />
                        Sources
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-foreground/80">
                        {result.sources.map((source, index) => (
                          <li key={index} className="text-sm">
                            {source}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Button variant="outline" onClick={handleGenerateCopy} className="flex-1">
                    Generate New Copy
                  </Button>
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(result.generatedCopy);
                      toast({
                        title: 'Copied!',
                        description: 'Copy has been copied to clipboard.',
                      });
                    }}
                    className="flex-1"
                  >
                    <FileCheck2 className="mr-2 h-4 w-4" />
                    Copy to Clipboard
                  </Button>
                </CardFooter>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[400px]">
                <CardContent className="text-center py-12">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Ready to Generate</h3>
                  <p className="text-muted-foreground max-w-md">
                    Paste source material, then describe what content you'd like to create.
                    Your generated copy will appear here with full fact-grounding.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div >
  );
}
