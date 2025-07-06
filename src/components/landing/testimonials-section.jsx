
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';
import { Star } from 'lucide-react'; // Using Star for ratings

const testimonials = [
  {
    quote: "Prepex revolutionized my job search! The AI insights helped me tailor my resume perfectly, and I landed my dream job within weeks.",
    name: 'Sarah L.',
    title: 'Marketing Manager',
    imageSrc: 'https://picsum.photos/100/100?random=user1',
    rating: 5,
    dataAiHint: 'professional woman',
  },
  {
    quote: "The LinkedIn analysis was incredibly detailed. I implemented the suggestions and saw a noticeable increase in profile views and recruiter outreach.",
    name: 'John B.',
    title: 'Software Engineer',
    imageSrc: 'https://picsum.photos/100/100?random=user2',
    rating: 5,
    dataAiHint: 'smiling man',
  },
  {
    quote: "As a recent graduate, building a strong resume was daunting. The resume builder and ATS tips were invaluable. Highly recommend!",
    name: 'Emily K.',
    title: 'Aspiring Data Analyst',
    imageSrc: 'https://picsum.photos/100/100?random=user3',
    rating: 4,
    dataAiHint: 'young student',
  },
];

const renderStars = (rating) => {
  return Array(5).fill(0).map((_, i) => (
    <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/50'}`} />
  ));
};

export default function TestimonialsSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Trusted by Professionals Like You
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            See what our users are saying about their success with Prepex.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col overflow-hidden bg-card">
              <CardContent className="p-6 flex-grow flex flex-col">
                <div className="flex mb-2">
                    {renderStars(testimonial.rating)}
                </div>
                <blockquote className="text-muted-foreground italic mb-4 flex-grow">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center mt-auto pt-4 border-t border-border">
                  <Image
                    src={testimonial.imageSrc}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                    data-ai-hint={testimonial.dataAiHint}
                  />
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
