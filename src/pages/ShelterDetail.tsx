import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Wifi, Bath, Bed, Heart, Navigation, Phone, NfcIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Layout/Header";
import { getShelterById } from "@/data/mockShelters";

/**
 * ShelterDetail page component
 * Displays comprehensive information about a specific shelter
 * Includes NFC tag registration and check-in functionality
 */
const ShelterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const shelter = id ? getShelterById(id) : null;

  if (!shelter) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Shelter Not Found</h1>
            <p className="text-muted-foreground mb-6">The shelter you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/">Return to Map</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Calculate congestion percentage for progress bar
  const getCongestionPercentage = (level: string) => {
    switch (level) {
      case "low": return 25;
      case "medium": return 65;
      case "high": return 90;
      default: return 0;
    }
  };

  const getCongestionColor = (level: string) => {
    switch (level) {
      case "low": return "bg-success";
      case "medium": return "bg-warning";
      case "high": return "bg-destructive";
      default: return "bg-primary";
    }
  };

  const getCongestionVariant = (level: string) => {
    switch (level) {
      case "low": return "success" as const;
      case "medium": return "warning" as const;
      case "high": return "destructive" as const;
      default: return "default" as const;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center space-x-1">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Map</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shelter Header */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">{shelter.name}</CardTitle>
                    <div className="flex items-center text-muted-foreground text-sm mb-4">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{shelter.address}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Navigation className="w-4 h-4 mr-1" />
                        <span>{shelter.distance} away</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        <span>{shelter.operatingHours}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant={getCongestionVariant(shelter.congestion)} className="text-sm">
                    {shelter.congestion.charAt(0).toUpperCase() + shelter.congestion.slice(1)} Congestion
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Operating Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Operating Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Today</span>
                    <span className="text-muted-foreground">{shelter.operatingHours}</span>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday</span>
                        <span className="text-muted-foreground">9 AM - 5 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tuesday</span>
                        <span className="text-muted-foreground">9 AM - 5 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wednesday</span>
                        <span className="text-muted-foreground">9 AM - 5 PM</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Thursday</span>
                        <span className="text-muted-foreground">9 AM - 5 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Friday</span>
                        <span className="text-muted-foreground">9 AM - 5 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="text-muted-foreground">10 AM - 2 PM</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Facilities */}
            <Card>
              <CardHeader>
                <CardTitle>Available Facilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className={`p-4 rounded-lg text-center ${
                    shelter.facilities.wifi ? 'bg-accent-light' : 'bg-muted opacity-50'
                  }`}>
                    <Wifi className={`w-8 h-8 mx-auto mb-2 ${
                      shelter.facilities.wifi ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <div className="font-medium text-sm">Wi-Fi</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${
                    shelter.facilities.showers ? 'bg-accent-light' : 'bg-muted opacity-50'
                  }`}>
                    <Bath className={`w-8 h-8 mx-auto mb-2 ${
                      shelter.facilities.showers ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <div className="font-medium text-sm">Showers</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${
                    shelter.facilities.beds ? 'bg-accent-light' : 'bg-muted opacity-50'
                  }`}>
                    <Bed className={`w-8 h-8 mx-auto mb-2 ${
                      shelter.facilities.beds ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <div className="font-medium text-sm">Beds</div>
                  </div>
                  <div className={`p-4 rounded-lg text-center ${
                    shelter.facilities.firstAid ? 'bg-accent-light' : 'bg-muted opacity-50'
                  }`}>
                    <Heart className={`w-8 h-8 mx-auto mb-2 ${
                      shelter.facilities.firstAid ? 'text-accent' : 'text-muted-foreground'
                    }`} />
                    <div className="font-medium text-sm">First Aid</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Congestion Level */}
            <Card>
              <CardHeader>
                <CardTitle>Current Congestion</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2 capitalize">{shelter.congestion}</div>
                  <div className="text-sm text-muted-foreground mb-4">
                    Estimated wait time: {shelter.waitTime}
                  </div>
                </div>
                <Progress 
                  value={getCongestionPercentage(shelter.congestion)} 
                  className="h-3"
                />
                <div className="text-xs text-muted-foreground text-center">
                  Updated 5 minutes ago
                </div>
              </CardContent>
            </Card>

            {/* NFC Tag Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <NfcIcon className="w-5 h-5 text-primary" />
                  <span>NFC Check-in</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Use NFC to quickly check in and help update real-time congestion levels.
                </p>
                <div className="space-y-2">
                  <Button className="w-full">
                    Register NFC Tag
                  </Button>
                  <Button variant="outline" className="w-full">
                    Check In Now
                  </Button>
                </div>
                <div className="text-xs text-center text-muted-foreground">
                  Hold your phone near the NFC tag at the shelter entrance
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full">
                  Get Directions
                </Button>
                <Button variant="outline" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Shelter
                </Button>
                <Button variant="outline" className="w-full">
                  Share Location
                </Button>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <span className="font-medium">Accessibility:</span>
                  <span className="text-muted-foreground ml-2">Wheelchair accessible</span>
                </div>
                <div>
                  <span className="font-medium">Parking:</span>
                  <span className="text-muted-foreground ml-2">Street parking available</span>
                </div>
                <div>
                  <span className="font-medium">Contact:</span>
                  <span className="text-muted-foreground ml-2">(555) 123-4567</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShelterDetail;