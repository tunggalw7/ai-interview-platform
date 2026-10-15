import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { assessmentsApi } from "@/services/assessments";
import { Plus, Clock, ChevronRight, ClipboardList, Layers, Users } from "lucide-react";
import type { Assessment } from "@/types";

function SessionStatusBadge({ session }: { session?: Assessment["latest_session"] }) {
  if (!session) {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
        No sessions yet
      </span>
    );
  }

  if (session.status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-primary bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        Interview Live Now
      </span>
    );
  }

  if (session.status === "ended" && session.end_reason === "error") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-destructive bg-destructive/10 px-2 py-0.5 rounded-full">
        Session Error
      </span>
    );
  }

  if (session.status === "ended") {
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
        ✓ Latest Completed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
      Awaiting Candidate
    </span>
  );
}

export default function AssessmentListPage() {
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    assessmentsApi
      .list()
      .then((res) => setAssessments(res.data.assessments))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-border/70">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground flex items-center gap-2.5">
            <ClipboardList className="h-6 w-6 text-primary" />
            Technical Assessments
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            Configure conversational AI skill rubrics, time ceilings, and evaluate candidate sessions.
          </p>
        </div>
        <Button onClick={() => navigate("/assessments/new")} className="shadow-sm shadow-primary/20 self-start sm:self-auto">
          <Plus className="h-4 w-4 mr-1.5" /> Create Assessment
        </Button>
      </div>

      {error && (
        <div className="border border-destructive/30 rounded-xl p-4 bg-destructive/5 text-sm text-destructive flex items-center gap-2">
          <span>Failed to load assessments from API. Please ensure the backend is running.</span>
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      ) : assessments.length === 0 ? (
        <div className="border border-dashed border-2 rounded-2xl p-12 text-center space-y-4 bg-card/50">
          <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto">
            <ClipboardList className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h3 className="font-semibold text-foreground">No assessments created yet</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Create your first assessment to define skill anchor criteria and start inviting candidates for conversational AI evaluation.
            </p>
          </div>
          <Button onClick={() => navigate("/assessments/new")}>
            <Plus className="h-4 w-4 mr-1.5" /> Create your first assessment
          </Button>
        </div>
      ) : (
        <div className="grid gap-3">
          {assessments.map((a) => (
            <Card
              key={a.id}
              className="group cursor-pointer hover:border-primary/50 hover:shadow-md transition-all duration-200 border-border/80 bg-card"
              onClick={() => navigate(`/assessments/${a.id}/invite`)}
            >
              <CardContent className="p-4 sm:p-5 flex items-center justify-between gap-4">
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h2 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors truncate">
                      {a.name}
                    </h2>
                    <SessionStatusBadge session={a.latest_session} />
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
                    <span className="flex items-center gap-1 bg-muted/60 px-2.5 py-1 rounded-md font-medium">
                      <Clock className="h-3.5 w-3.5 text-muted-foreground" />
                      {a.time_limit_min} minutes
                    </span>

                    {a.skills && (
                      <span className="flex items-center gap-1 bg-muted/60 px-2.5 py-1 rounded-md font-medium">
                        <Layers className="h-3.5 w-3.5 text-muted-foreground" />
                        {a.skills.length} target skills
                      </span>
                    )}

                    <span className="hidden sm:inline-flex items-center gap-1 text-slate-500">
                      <Users className="h-3.5 w-3.5" />
                      Candidate Sessions
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline">
                    Manage →
                  </span>
                  <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
