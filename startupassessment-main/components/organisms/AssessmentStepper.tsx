import { Progress } from "@/components/ui/progress"

export function AssessmentStepper({ stages, currentStage }: {
  stages: { id: string; name: string }[];
  currentStage: number;
}) {
  return (
    <div className="flex items-center gap-4">
      {stages.map((stage, idx) => (
        <div key={stage.id} className="flex items-center gap-2">
          <div className={`rounded-full w-8 h-8 flex items-center justify-center font-bold ${idx <= currentStage ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>{idx + 1}</div>
          <span className={idx === currentStage ? 'font-semibold' : 'text-muted-foreground'}>{stage.name}</span>
          {idx < stages.length - 1 && <span className="w-8 h-1 bg-muted rounded" />}
        </div>
      ))}
      <Progress value={((currentStage + 1) / stages.length) * 100} className="flex-1" />
    </div>
  )
} 