import { MapPin, Clock, Wifi, Bath, Bed, Heart, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

/**
 * Congestion level type definition
 */
export type CongestionLevel = "low" | "medium" | "high";

/**
 * Shelter data interface
 */
export interface Shelter {
  id: string;
  name: string;
  address: string;
  distance: string;
  operatingHours: string;
  congestion: CongestionLevel;
  waitTime: string;
  facilities: {
    wifi: boolean;
    showers: boolean;
    beds: boolean;
    firstAid: boolean;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
}

/**
 * Props for ShelterCard component
 */
interface ShelterCardProps {
  shelter: Shelter;
  showMap?: boolean;
}

/**
 * Get congestion color and text based on level
 */
const getCongestionInfo = (level: CongestionLevel) => {
  switch (level) {
    case "low":
      return {
        variant: "success" as const,
        text: "Low Congestion",
        color: "text-success-foreground",
        bgColor: "bg-success"
      };
    case "medium":
      return {
        variant: "warning" as const,
        text: "Medium Congestion",
        color: "text-warning-foreground",
        bgColor: "bg-warning"
      };
    case "high":
      return {
        variant: "destructive" as const,
        text: "High Congestion",
        color: "text-destructive-foreground",
        bgColor: "bg-destructive"
      };
  }
};

/**
 * ShelterCard component displays shelter information in a card format
 * Used in shelter lists and recommendations
 */
const ShelterCard = ({ shelter, showMap = false }: ShelterCardProps) => {
  const congestionInfo = getCongestionInfo(shelter.congestion);

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-foreground mb-1">
              {shelter.name}
            </CardTitle>
            <div className="flex items-center text-muted-foreground text-sm mb-2">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{shelter.address}</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center text-muted-foreground">
                <Navigation className="w-4 h-4 mr-1" />
                <span>{shelter.distance}</span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                <span>{shelter.operatingHours}</span>
              </div>
            </div>
          </div>
          
          {/* Congestion Status */}
          <div className="text-right">
            <Badge variant={congestionInfo.variant} className="mb-2">
              {congestionInfo.text}
            </Badge>
            <div className="text-xs text-muted-foreground">
              Wait: {shelter.waitTime}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Facilities */}
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex items-center space-x-2">
            {shelter.facilities.wifi && (
              <div className="flex items-center text-accent">
                <Wifi className="w-4 h-4" />
              </div>
            )}
            {shelter.facilities.showers && (
              <div className="flex items-center text-accent">
                <Bath className="w-4 h-4" />
              </div>
            )}
            {shelter.facilities.beds && (
              <div className="flex items-center text-accent">
                <Bed className="w-4 h-4" />
              </div>
            )}
            {shelter.facilities.firstAid && (
              <div className="flex items-center text-accent">
                <Heart className="w-4 h-4" />
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button size="sm" asChild className="flex-1">
            <Link to={`/shelter/${shelter.id}`}>
              View Details
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            Get Directions
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShelterCard;