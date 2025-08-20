import { useState } from "react";
import { Search, Filter, MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Header from "@/components/Layout/Header";
import MapView from "@/components/Map/MapView";
import ShelterCard from "@/components/Shelter/ShelterCard";
import { mockShelters, getSheltersByDistance } from "@/data/mockShelters";
import type { Shelter } from "@/components/Shelter/ShelterCard";

/**
 * Home page component - Main map interface for finding heat shelters
 * Features interactive map, search functionality, and shelter listings
 */
const Home = () => {
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [showList, setShowList] = useState(false);

  // Filter and sort shelters based on user preferences
  const filteredShelters = mockShelters.filter(shelter =>
    shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    shelter.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedShelters = [...filteredShelters].sort((a, b) => {
    if (sortBy === "distance") {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (sortBy === "congestion") {
      const congestionOrder = { "low": 1, "medium": 2, "high": 3 };
      return congestionOrder[a.congestion] - congestionOrder[b.congestion];
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-accent text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Cool Relief Near You
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
              Locate nearby heat shelters with real-time congestion data and facility information
            </p>
            
            {/* Quick Search */}
            <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="search"
                  placeholder="Search by shelter name or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-card text-foreground"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48 bg-card text-foreground">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Sort by Distance</SelectItem>
                  <SelectItem value="congestion">Sort by Congestion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <Card className="h-[600px]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Heat Shelter Locations</span>
                  </CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant={showList ? "outline" : "default"}
                      size="sm"
                      onClick={() => setShowList(false)}
                    >
                      Map View
                    </Button>
                    <Button
                      variant={showList ? "default" : "outline"}
                      size="sm"
                      onClick={() => setShowList(true)}
                    >
                      List View
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 h-[calc(100%-80px)]">
                {!showList ? (
                  <MapView
                    shelters={sortedShelters}
                    selectedShelterId={selectedShelter?.id}
                    onShelterSelect={setSelectedShelter}
                    className="h-full rounded-lg"
                  />
                ) : (
                  <div className="h-full overflow-y-auto p-4 space-y-4">
                    {sortedShelters.map((shelter) => (
                      <ShelterCard
                        key={shelter.id}
                        shelter={shelter}
                        showMap={false}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Shelter Details */}
            {selectedShelter && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selected Shelter</CardTitle>
                </CardHeader>
                <CardContent>
                  <ShelterCard shelter={selectedShelter} />
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Navigation className="w-5 h-5 text-primary" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-success-light rounded-lg">
                    <div className="text-2xl font-bold text-success">
                      {mockShelters.filter(s => s.congestion === "low").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Low Congestion</div>
                  </div>
                  <div className="text-center p-3 bg-warning-light rounded-lg">
                    <div className="text-2xl font-bold text-warning">
                      {mockShelters.filter(s => s.congestion === "medium").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Medium Congestion</div>
                  </div>
                </div>
                <div className="text-center p-3 bg-destructive-light rounded-lg">
                  <div className="text-2xl font-bold text-destructive">
                    {mockShelters.filter(s => s.congestion === "high").length}
                  </div>
                  <div className="text-sm text-muted-foreground">High Congestion</div>
                </div>
              </CardContent>
            </Card>

            {/* Nearest Shelters */}
            <Card>
              <CardHeader>
                <CardTitle>Nearest Shelters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getSheltersByDistance().slice(0, 3).map((shelter) => (
                  <div
                    key={shelter.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg cursor-pointer hover:bg-muted transition-colors"
                    onClick={() => setSelectedShelter(shelter)}
                  >
                    <div>
                      <div className="font-medium text-sm">{shelter.name}</div>
                      <div className="text-xs text-muted-foreground">{shelter.distance}</div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${
                      shelter.congestion === "low" ? "bg-success" :
                      shelter.congestion === "medium" ? "bg-warning" : "bg-destructive"
                    }`} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;