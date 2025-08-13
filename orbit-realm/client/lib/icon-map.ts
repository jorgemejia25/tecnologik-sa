// Centraliza el mapeo de nombres (strings) a componentes de iconos de lucide-react
// para permitir que el JSON editable por el admin defina iconos.
import * as Icons from "lucide-react";

// Devuelve el componente de icono correspondiente o un placeholder.
export function getIconComponent(name?: string) {
  if (!name) return Icons.CircleHelp;
  const Icon = (Icons as any)[name];
  return Icon || Icons.CircleHelp;
}

export type IconName = keyof typeof Icons;
