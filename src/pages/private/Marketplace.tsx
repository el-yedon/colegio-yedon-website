import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Star, Clock, Users } from 'lucide-react'

const COURSES = [
  {
    id: 1,
    title: 'Robótica Criativa',
    type: 'Curso Livre',
    description: 'Aprenda a construir robôs e programar no Arduino de forma prática e divertida.',
    duration: '40h',
    spots: 15,
    price: 'R$ 150/mês',
    image: 'https://img.usecurling.com/p/600/400?q=robotics',
  },
  {
    id: 2,
    title: 'Inglês Avançado (Conversação)',
    type: 'Curso Livre',
    description: 'Foco total na fala e escuta para alunos do Ensino Médio que já possuem base.',
    duration: '60h',
    spots: 20,
    price: 'R$ 200/mês',
    image: 'https://img.usecurling.com/p/600/400?q=english%20class',
  },
  {
    id: 3,
    title: 'Mentoria VIP: Preparatório ENEM',
    type: 'Mentoria',
    description:
      'Acompanhamento individualizado com plano de estudos focado em redação e matemática.',
    duration: 'Contínuo',
    spots: 5,
    price: 'R$ 450/mês',
    image: 'https://img.usecurling.com/p/600/400?q=studying%20exam',
  },
  {
    id: 4,
    title: 'Clube de Xadrez',
    type: 'Extracurricular',
    description: 'Desenvolva o raciocínio lógico e participe de torneios regionais.',
    duration: '20h',
    spots: 30,
    price: 'Gratuito',
    image: 'https://img.usecurling.com/p/600/400?q=chess%20board',
  },
]

export default function Marketplace() {
  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Marketplace Educacional</h2>
        <p className="text-muted-foreground">
          Amplie seus horizontes com nossos cursos livres, atividades extracurriculares e mentorias
          VIP.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {COURSES.map((course) => (
          <Card
            key={course.id}
            className="overflow-hidden flex flex-col group hover:shadow-md transition-shadow"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  className={
                    course.type === 'Mentoria' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-primary'
                  }
                >
                  {course.type}
                </Badge>
              </div>
            </div>
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg line-clamp-1">{course.title}</CardTitle>
              <CardDescription className="line-clamp-2 min-h-[40px]">
                {course.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-2 flex-1">
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" /> {course.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" /> {course.spots} vagas
                </div>
              </div>
              <p className="font-bold text-lg text-slate-800">{course.price}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full font-medium">
                {course.price === 'Gratuito' ? 'Inscrever-se' : 'Matricular-se'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
