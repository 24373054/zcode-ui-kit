import { useMemo, useState } from "react";
import { useTheme, type Theme } from "@sealwax/zcode-ui-theme";
import { Shimmer } from "@sealwax/zcode-ui-ai-elements/shimmer";
import {
  Snippet,
  SnippetAddon,
  SnippetCopyButton,
  SnippetInput,
} from "@sealwax/zcode-ui-ai-elements/snippet";
import { Suggestion, Suggestions } from "@sealwax/zcode-ui-ai-elements/suggestion";
import {
  Sources,
  SourcesContent,
  SourcesTrigger,
  Source,
} from "@sealwax/zcode-ui-ai-elements/sources";
import {
  Confirmation,
  ConfirmationRequest,
  ConfirmationAccepted,
  ConfirmationRejected,
  ConfirmationActions,
  ConfirmationAction,
} from "@sealwax/zcode-ui-ai-elements/confirmation";
import {
  CodeBlock,
  CodeBlockActions,
  CodeBlockCopyButton,
  CodeBlockHeader,
} from "@sealwax/zcode-ui-ai-elements/code-block";
import { Task, TaskTrigger, TaskContent, TaskItem } from "@sealwax/zcode-ui-ai-elements/task";
import { Tool, ToolHeader, ToolContent, ToolInput } from "@sealwax/zcode-ui-ai-elements/tool";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@sealwax/zcode-ui-core/accordion";
import { Alert, AlertDescription, AlertTitle } from "@sealwax/zcode-ui-core/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@sealwax/zcode-ui-core/alert-dialog";
import { Avatar, AvatarFallback } from "@sealwax/zcode-ui-core/avatar";
import { Badge } from "@sealwax/zcode-ui-core/badge";
import { Button } from "@sealwax/zcode-ui-core/button";
import { ButtonGroup } from "@sealwax/zcode-ui-core/button-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@sealwax/zcode-ui-core/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@sealwax/zcode-ui-core/chart";
import { Checkbox } from "@sealwax/zcode-ui-core/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@sealwax/zcode-ui-core/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@sealwax/zcode-ui-core/dropdown-menu";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@sealwax/zcode-ui-core/context-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@sealwax/zcode-ui-core/command";
import { ScrollFadeViewport } from "@sealwax/zcode-ui-core/scroll-fade-viewport";
import { FlipMetricValue } from "@sealwax/zcode-ui-core/flip-metric-value";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@sealwax/zcode-ui-core/hover-card";
import { Input } from "@sealwax/zcode-ui-core/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@sealwax/zcode-ui-core/input-group";
import { Kbd } from "@sealwax/zcode-ui-core/kbd";
import { Label } from "@sealwax/zcode-ui-core/label";
import { Popover, PopoverContent, PopoverTrigger } from "@sealwax/zcode-ui-core/popover";
import { Progress } from "@sealwax/zcode-ui-core/progress";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@sealwax/zcode-ui-core/resizable";
import { ScrollArea } from "@sealwax/zcode-ui-core/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sealwax/zcode-ui-core/select";
import { Separator } from "@sealwax/zcode-ui-core/separator";
import { Spinner } from "@sealwax/zcode-ui-core/spinner";
import { Switch } from "@sealwax/zcode-ui-core/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@sealwax/zcode-ui-core/tabs";
import { Textarea } from "@sealwax/zcode-ui-core/textarea";
import { toast } from "@sealwax/zcode-ui-core/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@sealwax/zcode-ui-core/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@sealwax/zcode-ui-core/dialog";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChevronDownIcon, SearchIcon } from "lucide-react";

const THEMES: { value: Theme; label: string }[] = [
  { value: "zai-light", label: "Zai Light" },
  { value: "zai-dark", label: "Zai Dark" },
  { value: "system", label: "System" },
];

const chartConfig = {
  desktop: { label: "Desktop", color: "var(--color-usage-chart-1, #0b7fff)" },
  mobile: { label: "Mobile", color: "var(--color-primary, #6366f1)" },
} satisfies ChartConfig;

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 273, mobile: 190 },
];

export default function App() {
  const { theme, setTheme } = useTheme({
    storageKey: "zcode-ui-kit-demo-theme",
    defaultTheme: "zai-dark",
  });
  const [metric, setMetric] = useState(1280);
  const [openCollapsible, setOpenCollapsible] = useState(false);
  const suggestions = useMemo(() => ["Summarize", "Refactor", "Write tests"], []);

  return (
    <TooltipProvider>
      <div className="min-h-dvh bg-background text-foreground">
        <header className="sticky top-0 z-10 border-b border-border bg-header/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
            <div>
              <h1 className="text-ui-lg font-semibold tracking-tight">zcode-ui-kit</h1>
              <p className="text-ui-sm text-foreground-subtle">
                Formal 1.0.1 · theme: <code>{theme}</code>
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
              <CardDescription>Core actions, groups, and status chips</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
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
              </div>
              <ButtonGroup>
                <Button variant="outline" size="sm">
                  Left
                </Button>
                <Button variant="outline" size="sm">
                  Middle
                </Button>
                <Button variant="outline" size="sm">
                  Right
                </Button>
              </ButtonGroup>
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
              <div className="grid gap-2 md:col-span-2">
                <Label>Search (input group)</Label>
                <InputGroup>
                  <InputGroupAddon>
                    <SearchIcon className="size-4" />
                  </InputGroupAddon>
                  <InputGroupInput placeholder="Search components…" />
                </InputGroup>
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
              <CardTitle>Overlays & menus</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary">Dialog</Button>
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

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">Alert dialog</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone (demo only).
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Dropdown</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => toast("Copied", { variant: "info" })}>
                    Copy
                  </DropdownMenuItem>
                  <DropdownMenuItem>Share</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-64 text-ui-sm">
                  Lightweight popover content for filters or hints.
                </PopoverContent>
              </Popover>

              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost">Hover card</Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-64">
                  <p className="text-ui-sm font-medium">@sealwax/zcode-ui-core</p>
                  <p className="text-ui-sm text-foreground-subtle">
                    Open and adopt in any React + Tailwind project.
                  </p>
                </HoverCardContent>
              </HoverCard>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline">Tooltip</Button>
                </TooltipTrigger>
                <TooltipContent>Tooltip content</TooltipContent>
              </Tooltip>

              <Button
                variant="outline"
                onClick={() => toast("Saved successfully", { variant: "info" })}
              >
                Toast
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback & layout</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <Alert>
                <AlertTitle>Heads up</AlertTitle>
                <AlertDescription>
                  Packages ship <code>dist/</code> (ESM + types). This demo uses workspace source
                  via Vite aliases for HMR.
                </AlertDescription>
              </Alert>
              <Progress value={64} />
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>ZC</AvatarFallback>
                </Avatar>
                <Separator orientation="vertical" className="h-8" />
                <div className="flex items-center gap-2 text-ui-sm">
                  <span className="text-foreground-subtle">Metric</span>
                  <FlipMetricValue value={String(metric)} />
                  <Button size="sm" variant="outline" onClick={() => setMetric((n) => n + 37)}>
                    +37
                  </Button>
                </div>
              </div>
              <Collapsible open={openCollapsible} onOpenChange={setOpenCollapsible}>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    Collapsible
                    <ChevronDownIcon
                      className={`size-4 transition-transform ${openCollapsible ? "rotate-180" : ""}`}
                    />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="text-ui-sm text-foreground-subtle">
                  Extra details live here when expanded.
                </CollapsibleContent>
              </Collapsible>
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
              <CardTitle>Scroll & resizable</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <ScrollArea className="h-36 rounded-md border border-border p-3">
                <div className="space-y-2 text-ui-sm text-foreground-subtle">
                  {Array.from({ length: 12 }, (_, i) => (
                    <p key={i}>Scrollable row {i + 1}</p>
                  ))}
                </div>
              </ScrollArea>
              <ResizablePanelGroup
                layoutId="zcode-ui-kit-demo-split"
                orientation="horizontal"
                panelIds={["demo-a", "demo-b"]}
                className="min-h-36 rounded-md border border-border"
              >
                <ResizablePanel id="demo-a" defaultSize="55" minSize="20%">
                  <div className="flex h-full items-center justify-center text-ui-sm">A</div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel id="demo-b" defaultSize="45" minSize="20%">
                  <div className="flex h-full items-center justify-center text-ui-sm">B</div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Command, context menu & scroll fade</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <Command className="rounded-md border border-border">
                <CommandInput placeholder="Type a command…" />
                <CommandList>
                  <CommandEmpty>No results.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>Calendar</CommandItem>
                    <CommandItem>Search emoji</CommandItem>
                    <CommandItem>Settings</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
              <div className="flex flex-col gap-3">
                <ContextMenu>
                  <ContextMenuTrigger className="flex h-24 items-center justify-center rounded-md border border-dashed border-border text-ui-sm text-foreground-subtle">
                    Right-click here
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem>Profile</ContextMenuItem>
                    <ContextMenuItem>Billing</ContextMenuItem>
                    <ContextMenuItem>Team</ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
                <ScrollFadeViewport className="h-24 rounded-md border border-border">
                  <div className="space-y-2 p-3 text-ui-sm text-foreground-subtle">
                    {Array.from({ length: 10 }, (_, i) => (
                      <p key={i}>Fade edge row {i + 1}</p>
                    ))}
                  </div>
                </ScrollFadeViewport>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Chart</CardTitle>
              <CardDescription>Requires optional peer <code>recharts</code></CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="aspect-[2/1] w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>@sealwax/zcode-ui-ai-elements</CardTitle>
              <CardDescription>
                1.0 highlights — shimmer / suggestion / snippet / sources / confirmation / code-block / task / tool
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <Shimmer className="text-ui-lg font-medium">Generating response…</Shimmer>
              <Suggestions>
                {suggestions.map((s) => (
                  <Suggestion
                    key={s}
                    suggestion={s}
                    onClick={(value) => toast(`Suggestion: ${value}`, { variant: "info" })}
                  />
                ))}
              </Suggestions>
              <Snippet code="pnpm add @sealwax/zcode-ui-ai-elements">
                <SnippetInput />
                <SnippetAddon align="inline-end">
                  <SnippetCopyButton />
                </SnippetAddon>
              </Snippet>
              <Sources>
                <SourcesTrigger count={2} />
                <SourcesContent>
                  <Source href="https://github.com/24373054/zcode-ui-kit" title="zcode-ui-kit" />
                  <Source href="https://github.com/zai-org/ZCode" title="ZCode upstream" />
                </SourcesContent>
              </Sources>
              <Confirmation
                approval={{ id: "demo-approval" }}
                state="approval-requested"
              >
                <ConfirmationRequest>
                  Allow the agent to run <code>pnpm test</code>?
                </ConfirmationRequest>
                <ConfirmationActions>
                  <ConfirmationAction
                    variant="outline"
                    onClick={() => toast("Rejected", { variant: "info" })}
                  >
                    Reject
                  </ConfirmationAction>
                  <ConfirmationAction
                    variant="default"
                    onClick={() => toast("Approved", { variant: "info" })}
                  >
                    Approve
                  </ConfirmationAction>
                </ConfirmationActions>
              </Confirmation>
              <CodeBlock code={'export const hello = "zcode-ui 1.0.1";'} language="typescript">
                <CodeBlockHeader>
                  <CodeBlockActions>
                    <CodeBlockCopyButton />
                  </CodeBlockActions>
                </CodeBlockHeader>
              </CodeBlock>
              <Task defaultOpen>
                <TaskTrigger title="Explore codebase" />
                <TaskContent>
                  <TaskItem>Scan packages/ui for standalone extracts</TaskItem>
                  <TaskItem>Publish @sealwax/zcode-ui-ai-elements</TaskItem>
                </TaskContent>
              </Task>
              <Tool defaultOpen>
                <ToolHeader type="tool-read_file" state="output-available" />
                <ToolContent>
                  <ToolInput input={{ path: "packages/ai-elements/package.json" }} />
                </ToolContent>
              </Tool>
            </CardContent>
          </Card>
        </main>
      </div>
    </TooltipProvider>
  );
}
