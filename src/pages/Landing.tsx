
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Shield, Clock, Users, CheckCircle, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: FileText,
      title: 'Document Management',
      description: 'Securely store and organize all your professional documents in one place.'
    },
    {
      icon: Clock,
      title: 'Expiry Tracking',
      description: 'Never miss a renewal again with automatic expiry alerts and reminders.'
    },
    {
      icon: Shield,
      title: 'Secure Sharing',
      description: 'Share your credentials with agencies instantly while maintaining full control.'
    },
    {
      icon: Users,
      title: 'Agency Ready',
      description: 'Meet agency requirements faster with verified, up-to-date documentation.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Care Assistant',
      content: 'CarerPassport made my job search so much easier. Agencies can see all my qualifications instantly.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'David Chen',
      role: 'Senior Carer',
      content: 'I never miss document renewals anymore. The alerts save me so much stress.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face'
    },
    {
      name: 'Comfort Care Agency',
      role: 'Recruitment Team',
      content: 'We can verify candidate qualifications in seconds. It has transformed our hiring process.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/05225979-22df-40a3-ae92-ef3680de52e6.png" 
                  alt="CarerPassport Logo" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">CarerPassport</h1>
                <p className="text-sm text-gray-600">Your Professional Care Credentials</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                onClick={() => navigate('/agency-portal')}
              >
                Agency Portal
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate('/dashboard')}
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-blue-100 text-blue-800">
                Trusted by 10,000+ Care Professionals
              </Badge>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Your Care Career,
                <span className="text-blue-600"> Simplified</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Store, manage, and share your professional care documents securely. 
                Never miss a renewal, never lose an opportunity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/onboarding')}
                  className="text-lg px-8 py-3"
                >
                  Get Started as a Carer
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/agency-portal')}
                  className="text-lg px-8 py-3"
                >
                  I'm a Care Agency
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop" 
                alt="Caring professional helping elderly person" 
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">Verified Professionals</p>
                    <p className="text-sm text-gray-600">Trusted by agencies nationwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built specifically for care professionals and the agencies that hire them.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Care in Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Compassionate Care, Professional Excellence
            </h2>
            <p className="text-xl text-gray-600">
              Supporting the heroes who make a difference every day
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1504439904031-93ded9f93e4e?w=400&h=300&fit=crop" 
                alt="Carer assisting elderly person with walking" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-white font-semibold text-lg">Mobility Support</h3>
                <p className="text-white/90 text-sm">Helping maintain independence and dignity</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop" 
                alt="Nurse checking on elderly patient" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-white font-semibold text-lg">Health Monitoring</h3>
                <p className="text-white/90 text-sm">Professional medical care and attention</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop" 
                alt="Carer having a friendly conversation with elderly person" 
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                <h3 className="text-white font-semibold text-lg">Companionship</h3>
                <p className="text-white/90 text-sm">Building meaningful relationships and trust</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                For Care Professionals
              </h2>
              <ul className="space-y-4">
                {[
                  'Keep all your documents organized in one secure place',
                  'Get automatic alerts before documents expire',
                  'Share credentials with agencies instantly',
                  'Track your professional development',
                  'Never lose important certificates again'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=500&h=400&fit=crop" 
                alt="Professional carer with elderly client" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mt-20">
            <div className="order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=500&h=400&fit=crop" 
                alt="Care team meeting" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                For Care Agencies
              </h2>
              <ul className="space-y-4">
                {[
                  'Verify candidate qualifications instantly',
                  'Reduce time-to-hire by 70%',
                  'Ensure compliance with current regulations',
                  'Access verified, up-to-date documents',
                  'Streamline your recruitment process'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Care Professionals
            </h2>
            <p className="text-xl text-gray-600">
              See what our community says about CarerPassport
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Care Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of care professionals who trust CarerPassport with their credentials.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate('/onboarding')}
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 flex items-center justify-center">
              <img 
                src="/lovable-uploads/05225979-22df-40a3-ae92-ef3680de52e6.png" 
                alt="CarerPassport Logo" 
                className="w-8 h-8 object-contain filter brightness-0 invert"
              />
            </div>
            <span className="text-xl font-bold">CarerPassport</span>
          </div>
          <p className="text-gray-400">
            © 2024 CarerPassport. Empowering care professionals everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
