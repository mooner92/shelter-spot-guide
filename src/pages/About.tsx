import { MapPin, Shield, Users, Zap, Heart, Phone, Mail, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Layout/Header";

/**
 * About page component
 * Provides information about the Heat Shelter Finder service
 */
const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Heat Shelter Finder
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              Connecting communities with cool relief during extreme heat events
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Mission Statement */}
        <div className="max-w-4xl mx-auto mb-16">
          <Card>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Heat Shelter Finder is dedicated to protecting vulnerable community members during extreme heat events by providing real-time access to cooling centers, shelters, and relief locations. Our platform combines modern technology with community-driven data to ensure everyone can find safe, cool refuge when they need it most.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How We Help</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-primary-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Real-Time Locations</h3>
                <p className="text-sm text-muted-foreground">
                  Find the nearest cooling centers and shelters with up-to-date location information and directions.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-accent-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">Congestion Tracking</h3>
                <p className="text-sm text-muted-foreground">
                  See real-time congestion levels to find shelters with shorter wait times and available space.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-success-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-success" />
                </div>
                <h3 className="font-semibold mb-2">Verified Information</h3>
                <p className="text-sm text-muted-foreground">
                  All shelter information is verified and regularly updated by local authorities and community partners.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-warning-light rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-warning" />
                </div>
                <h3 className="font-semibold mb-2">Quick Access</h3>
                <p className="text-sm text-muted-foreground">
                  Fast, mobile-friendly interface designed for emergency situations and easy accessibility.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-semibold mb-2">Find Nearby Shelters</h3>
                <p className="text-muted-foreground">
                  Use our map or search to locate heat relief centers near your current location.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-semibold mb-2">Check Availability</h3>
                <p className="text-muted-foreground">
                  View real-time congestion levels, wait times, and available facilities at each location.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-semibold mb-2">Get Directions</h3>
                <p className="text-muted-foreground">
                  Get turn-by-turn directions to your chosen shelter and check in using NFC technology.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Community Impact */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Community Impact</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">15,000+</div>
                  <div className="text-muted-foreground">People Helped</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-accent mb-2">150+</div>
                  <div className="text-muted-foreground">Partner Locations</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-success mb-2">24/7</div>
                  <div className="text-muted-foreground">Service Availability</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Partners */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Partners</h2>
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <p className="text-center text-muted-foreground mb-8">
                  We work closely with local governments, community organizations, and emergency services to ensure accurate and timely information.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2">
                      <Shield className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">Emergency Services</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2">
                      <Users className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">Community Centers</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2">
                      <Heart className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">Non-Profits</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mb-2">
                      <MapPin className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium">Local Government</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Information */}
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-2xl">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-muted-foreground mb-6">
                    Have questions, suggestions, or want to partner with us? We'd love to hear from you.
                  </p>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Emergency Hotline</div>
                      <div className="text-sm text-muted-foreground">(555) SHELTER</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <div className="font-medium">Support Email</div>
                      <div className="text-sm text-muted-foreground">help@shelterguide.org</div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="text-center">
                  <Button className="mr-4">
                    Contact Support
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;