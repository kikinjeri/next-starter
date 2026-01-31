
import { Button } from "@/components/ui/Button";

export default function Home() {
  return (
    <div>
      <Section title="Cinematic Test">
        <p>
          This is your new cinematic foundation — deep charcoal, soft off‑white,
          gold accents, and a subtle gradient wash in the background. Everything
          is structural, responsive, and ready for any project.
        </p>

        <Card title="Atmosphere Check">
          <p>
            Cards use a soft glassy background with charcoal borders. This keeps
            things modern and premium without locking you into a design system.
          </p>
          <Button>Test Button</Button>
        </Card>
      </Section>
    </div>
  );
}
