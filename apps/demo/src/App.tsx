import { useTheme, type Theme } from "@zcode-ui/theme";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@zcode-ui/core/accordion";
import { Alert, AlertDescription, AlertTitle } from "@zcode-ui/core/alert";
import { Avatar, AvatarFallback } from "@zcode-ui/core/avatar";
import { Badge } from "@zcode-ui/core/badge";
import { Button } from "@zcode-ui/core/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@zcode-ui/core/card";
import { Checkbox } from "@zcode-ui/core/checkbox";
import { Input } from "@zcode-ui/core/input";
import { Label } from "@zcode-ui/core/label";
import { Progress } from "@zcode-ui/core/progress";
import { Separator } from "@zcode-ui/core/separator";
import { Spinner } from "@zcode-ui/core/spinner";
import { Switch } from "@zcode-ui/core/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@zcode-ui/core/tabs";
import { Textarea } from "@zcode-ui/core/textarea";
import { Kbd } from "@zcode-ui/core/kbd";
import { toast } from "@zcode-ui/core/toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@zcode-ui/core/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@zcode-ui/core/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@zcode-ui/core/tooltip";

const THEMES: { value: Theme; label: string }[] = [
  { value: "zai-light", label: "Zai Light" },
  { value: "zai-dark", label: "Zai Dark" },
  { value: "system", label: "System" },
];

export default function App() {
  const { theme, setTheme } = useTheme({ storageKey: "zcode-ui-kit-demo-theme" });

  return (
    <TooltipProvider>
      <div className="min-h-dvh bg-background text-foreground">
        <header className="sticky top-0 z-10 border-b border-border bg-header/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
            <div>
              <h1 className="text-ui-lg font-semibold tracking-tight">zcode-ui-kit</h1>
              <p className="text-ui-sm text-foreground-subtle">
                Standalone extract from ZCode packages/ui
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {THEMES.map((t) => (
                <Button
                  key={t.value}
                  size="sm"
                  variant={theme === t.value ? "default" : "outline"}
                  onClick={() => setTheme(t.value)}
                >
                  {t.label}
                </Button>
              ))}
            </div>
          </div>
        </header>

        <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-8">
          <Card>
            <CardHeader>
              <CardTitle>Buttons & badges</CardTitle>
              <CardDescription>Core actions and status chips</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Spinner />
              <Kbd>⌘K</Kbd>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Form controls</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Ada Lovelace" />
              </div>
              <div className="grid gap-2">
                <Label>Framework</Label>
                <Select defaultValue="react">
                  <SelectTrigger>
                    <SelectValue placeholder="Pick one" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="react">React</SelectItem>
                    <SelectItem value="vue">Vue</SelectItem>
                    <SelectItem value="svelte">Svelte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2 md:col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" placeholder="Short bio…" rows={3} />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="terms" defaultChecked />
                <Label htmlFor="terms">Accept terms</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch id="notify" defaultChecked />
                <Label htmlFor="notify">Notifications</Label>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Alert>
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>
                  This kit ships TypeScript source for Vite/esbuild hosts.
                </AlertDescription>
              </Alert>
              <Progress value={64} />
              <div className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  onClick={() => toast("Saved successfully", { variant: "info" })}
                >
                  Show toast
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">Open dialog</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Example dialog</DialogTitle>
                      <DialogDescription>
                        Dialog, alert-dialog, menus, and popovers are included in core.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button>Confirm</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">Hover me</Button>
                  </TooltipTrigger>
                  <TooltipContent>Tooltip content</TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tabs & accordion</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              <Tabs defaultValue="one">
                <TabsList>
                  <TabsTrigger value="one">One</TabsTrigger>
                  <TabsTrigger value="two">Two</TabsTrigger>
                </TabsList>
                <TabsContent value="one" className="text-ui-sm text-foreground-subtle">
                  First panel
                </TabsContent>
                <TabsContent value="two" className="text-ui-sm text-foreground-subtle">
                  Second panel
                </TabsContent>
              </Tabs>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="a">
                  <AccordionTrigger>What is this?</AccordionTrigger>
                  <AccordionContent>
                    A reusable UI kit extracted from ZCode&apos;s clean shadcn layer.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="b">
                  <AccordionTrigger>What is it not?</AccordionTrigger>
                  <AccordionContent>
                    Not the ZCode app shell, agent runtime, login, git, or terminal.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Avatar & separator</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>ZC</AvatarFallback>
              </Avatar>
              <Separator orientation="vertical" className="h-8" />
              <span className="text-ui-sm text-foreground-subtle">
                Theme: <code className="text-foreground">{theme}</code>
              </span>
            </CardContent>
          </Card>
        </main>
      </div>
    </TooltipProvider>
  );
}
