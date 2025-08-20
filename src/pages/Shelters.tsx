import { useState } from "react";
import { Search, Filter, SlidersHorizontal, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import ShelterCard from "@/components/Shelter/ShelterCard";
import MapView from "@/components/Map/MapView";
import { mockShelters } from "@/data/mockShelters";
import type { Shelter } from "@/components/Shelter/ShelterCard";

/**
 * Shelters page component
 * Displays recommended shelters based on user location and preferences
 * Features filtering, sorting, and both list/map views
 */
const Shelters = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("distance");
  const [filterBy, setFilterBy] = useState("all");
  const [selectedShelter, setSelectedShelter] = useState<Shelter | null>(null);

  // Filter shelters based on search query and congestion filter
  const filteredShelters = mockShelters.filter(shelter => {
    const matchesSearch = shelter.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         shelter.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterBy === "all" || shelter.congestion === filterBy;
    
    return matchesSearch && matchesFilter;
  });

  // Sort shelters based on selected criteria
  const sortedShelters = [...filteredShelters].sort((a, b) => {
    if (sortBy === "distance") {
      return parseFloat(a.distance) - parseFloat(b.distance);
    } else if (sortBy === "congestion") {
      const congestionOrder = { "low": 1, "medium": 2, "high": 3 };
      return congestionOrder[a.congestion] - congestionOrder[b.congestion];
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Page Header */}
      <section className="bg-gradient-to-r from-primary-light to-accent-light py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Recommended Shelters Near You
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Based on your current location and congestion levels, here are some shelters that meet your needs.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="search"
                  placeholder="Search for shelters by name or address..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              {/* Sort By */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="distance">Sort by Distance</SelectItem>
                  <SelectItem value="congestion">Sort by Congestion</SelectItem>
                  <SelectItem value="name">Sort by Name</SelectItem>
                </SelectContent>
              </Select>

              {/* Filter By Congestion */}
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Congestion Levels</SelectItem>
                  <SelectItem value="low">Low Congestion</SelectItem>
                  <SelectItem value="medium">Medium Congestion</SelectItem>
                  <SelectItem value="high">High Congestion</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-muted-foreground">
            Found {sortedShelters.length} shelter{sortedShelters.length !== 1 ? 's' : ''}
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        </div>

        {/* Tab Navigation */}
        <Tabs defaultValue="list" className="w-full">
          <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
            <TabsTrigger value="list" className="flex items-center space-x-2">
              <span>List View</span>
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>Map View</span>
            </TabsTrigger>
          </TabsList>

          {/* List View */}
          <TabsContent value="list" className="space-y-4 mt-6">
            {sortedShelters.length === 0 ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <div className="text-muted-foreground">
                    No shelters found matching your criteria.
                  </div>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("");
                      setFilterBy("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {sortedShelters.map((shelter) => (
                  <ShelterCard
                    key={shelter.id}
                    shelter={shelter}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Map View */}
          <TabsContent value="map" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Map */}
              <div className="lg:col-span-3">
                <Card className="h-[600px]">
                  <CardContent className="p-0 h-full">
                    <MapView
                      shelters={sortedShelters}
                      selectedShelterId={selectedShelter?.id}
                      onShelterSelect={setSelectedShelter}
                      className="h-full rounded-lg"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Selected Shelter Info */}
              <div>
                {selectedShelter ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Selected Shelter</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ShelterCard shelter={selectedShelter} />
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6">
                      <div className="text-center text-muted-foreground">
                        <MapPin className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>Click on a shelter marker to view details</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Shelters;