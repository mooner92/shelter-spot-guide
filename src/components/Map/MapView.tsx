import { useState } from "react";
import { MapPin, Plus, Minus, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Shelter } from "@/components/Shelter/ShelterCard";

/**
 * Props for MapView component
 */
interface MapViewProps {
  shelters: Shelter[];
  selectedShelterId?: string;
  onShelterSelect?: (shelter: Shelter) => void;
  className?: string;
}

/**
 * Mock map component that simulates a real map interface
 * In a real implementation, this would integrate with Google Maps, Mapbox, etc.
 */
const MapView = ({ shelters, selectedShelterId, onShelterSelect, className = "" }: MapViewProps) => {
  const [zoom, setZoom] = useState(12);
  const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // San Francisco

  /**
   * Get marker color based on congestion level
   */
  const getMarkerColor = (congestion: string) => {
    switch (congestion) {
      case "low":
        return "bg-success";
      case "medium":
        return "bg-warning";
      case "high":
        return "bg-destructive";
      default:
        return "bg-primary";
    }
  };

  return (
    <Card className={`relative overflow-hidden ${className}`}>
      {/* Map Container */}
      <div className="relative w-full h-full min-h-[400px] bg-gradient-to-br from-primary-light to-accent-light">
        {/* Mock map background pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 75%, transparent 75%),
              linear-gradient(-45deg, transparent 25%, rgba(255,255,255,0.1) 25%, rgba(255,255,255,0.1) 75%, transparent 75%)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 10px 10px'
          }}
        />

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 z-10">
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setZoom(Math.min(18, zoom + 1))}
            className="w-8 h-8 p-0"
          >
            <Plus className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setZoom(Math.max(8, zoom - 1))}
            className="w-8 h-8 p-0"
          >
            <Minus className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            onClick={() => {
              setZoom(12);
              setCenter({ lat: 37.7749, lng: -122.4194 });
            }}
            className="w-8 h-8 p-0"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>

        {/* Search Bar on Map */}
        <div className="absolute top-4 left-4 right-16 z-10">
          <input
            type="search"
            placeholder="Search for shelters by name or address..."
            className="w-full px-4 py-2 rounded-lg border bg-card/95 backdrop-blur text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Shelter Markers */}
        <div className="absolute inset-0 pointer-events-none">
          {shelters.map((shelter, index) => {
            // Mock positioning - in real implementation, this would use actual coordinates
            const x = 20 + (index * 15) % 80;
            const y = 20 + (index * 12) % 70;
            const isSelected = shelter.id === selectedShelterId;

            return (
              <div
                key={shelter.id}
                className="absolute pointer-events-auto cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
                style={{ 
                  left: `${x}%`, 
                  top: `${y}%`,
                  zIndex: isSelected ? 20 : 10
                }}
                onClick={() => onShelterSelect?.(shelter)}
              >
                <div className={`
                  relative w-8 h-8 rounded-full border-2 border-card shadow-lg transition-all duration-200 hover:scale-110
                  ${getMarkerColor(shelter.congestion)}
                  ${isSelected ? 'ring-4 ring-primary ring-opacity-50 scale-125' : ''}
                `}>
                  <MapPin className="w-4 h-4 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </div>
                
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-card text-foreground px-3 py-2 rounded-lg shadow-lg text-sm whitespace-nowrap border">
                    <div className="font-semibold">{shelter.name}</div>
                    <div className="text-muted-foreground text-xs">{shelter.congestion} congestion</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mock Street Labels */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 text-muted-foreground text-sm font-medium opacity-60">
            Market Street
          </div>
          <div className="absolute top-1/2 left-1/3 text-muted-foreground text-sm font-medium opacity-60">
            Mission District
          </div>
          <div className="absolute top-1/3 right-1/4 text-muted-foreground text-sm font-medium opacity-60">
            Downtown
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur rounded-lg p-3 text-sm border">
          <div className="font-semibold mb-2 text-foreground">Congestion Levels</div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-success"></div>
              <span className="text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-warning"></div>
              <span className="text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-destructive"></div>
              <span className="text-muted-foreground">High</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MapView;