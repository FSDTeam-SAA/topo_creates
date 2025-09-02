"use client";

import { MapPin, X } from "lucide-react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";

const MAPBOX_TOKEN =
  process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || "your-mapbox-token-here";

interface Product {
  id: string;
  name: string;
  price?: number;
}

interface Marker {
  lat: number;
  lng: number;
  title?: string;
  products?: Product[];
}

const defaultMarkers: Marker[] = [
  {
    lat: -33.8688,
    lng: 151.2093,
    title: "Sydney CBD Store",
    products: [
      { id: "1", name: "Wireless Headphones", price: 99.99 },
      { id: "2", name: "Smart Watch", price: 199.99 },
      { id: "3", name: "Bluetooth Speaker", price: 79.99 },
    ],
  },
  {
    lat: -33.8915,
    lng: 151.2767,
    title: "Bondi Beach Outlet",
    products: [
      { id: "4", name: "Beach Towel", price: 29.99 },
      { id: "5", name: "Sunscreen SPF 50+", price: 19.99 },
      { id: "6", name: "Waterproof Phone Case", price: 34.99 },
      { id: "7", name: "Surfboard Wax", price: 9.99 },
    ],
  },
  {
    lat: -33.8003,
    lng: 151.1784,
    title: "Chatswood Tech Store",
    products: [
      { id: "8", name: 'Laptop Pro 16"', price: 2499.99 },
      { id: "9", name: "Wireless Keyboard", price: 89.99 },
      { id: "10", name: "Noise Cancelling Headphones", price: 349.99 },
      { id: "11", name: "4K Webcam", price: 129.99 },
    ],
  },
  {
    lat: -33.9022,
    lng: 151.1753,
    title: "Darling Harbour Fashion",
    products: [
      { id: "12", name: "Designer Sunglasses", price: 199.99 },
      { id: "13", name: "Leather Wallet", price: 89.99 },
      { id: "14", name: "Silk Scarf", price: 59.99 },
    ],
  },
];

const CustomMarker = ({
  title,
  active,
}: {
  title?: string;
  active?: boolean;
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center cursor-pointer"
      style={{ transform: "translateY(-100%)" }}
    >
      <MapPin
        size={30}
        className={`text-[#800000]  transition-all ${
          active ? "scale-110 fill-white" : "fill-white"
        }`}
      />
      {title && (
        <div
          className={`bg-white px-2 py-1 rounded text-xs font-medium text-[#800000]  mt-1 whitespace-nowrap ${
            active ? "font-bold" : ""
          }`}
        >
          {title}
        </div>
      )}
    </div>
  );
};

const ProductPopover = ({
  products,
  position,
  onClose,
}: {
  products?: Product[];
  position: { top: number; left: number };
  onClose: () => void;
}) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (!products || products.length === 0) return null;

  return (
    <div
      ref={popoverRef}
      className="absolute z-50 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[250px]"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translate(-50%, 10px)",
      }}
    >
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="font-bold">Available Products</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X size={16} />
        </button>
      </div>
      <ul className="divide-y divide-gray-100">
        {products.map((product) => (
          <li key={product.id} className="p-3 hover:bg-gray-50">
            <div className="flex justify-between">
              <span>{product.name}</span>
              {product.price && (
                <span className="font-medium">${product.price.toFixed(2)}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const FindNearMap = ({
  markers = defaultMarkers,
  center = [151.2093, -33.8688],
  zoom = 13,
}: {
  markers?: Marker[];
  center?: [number, number];
  zoom?: number;
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [activeMarker, setActiveMarker] = useState<Marker | null>(null);
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });

  const handleMarkerClick = useCallback((marker: Marker) => {
    if (map.current) {
      // Convert lat/lng to pixel coordinates
      const point = map.current.project([marker.lng, marker.lat]);
      setPopoverPosition({
        top: point.y,
        left: point.x,
      });
      setActiveMarker(marker);
    }
  }, []);

  const closePopover = useCallback(() => {
    setActiveMarker(null);
  }, []);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    try {
      if (!MAPBOX_TOKEN || MAPBOX_TOKEN === "your-mapbox-token-here") {
        throw new Error("Invalid Mapbox token");
      }

      mapboxgl.accessToken = MAPBOX_TOKEN;

      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/light-v11",
        center: center,
        zoom: zoom,
        attributionControl: false,
      });

      map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

      markers.forEach((marker) => {
        if (marker.lat && marker.lng) {
          const markerElement = document.createElement("div");
          markerElement.innerHTML = `
            <div class="custom-marker">
              ${ReactDOMServer.renderToString(
                <CustomMarker
                  title={marker.title}
                  active={
                    activeMarker?.lat === marker.lat &&
                    activeMarker?.lng === marker.lng
                  }
                />
              )}
            </div>
          `;

          markerElement.addEventListener("click", (e) => {
            e.stopPropagation();
            // handleMarkerClick(marker, e as unknown as React.MouseEvent);
            handleMarkerClick(marker);
          });

          new mapboxgl.Marker({
            element: markerElement,
            anchor: "bottom",
          })
            .setLngLat([marker.lng, marker.lat])
            .addTo(map.current!);
        }
      });

      // Close popover when map is clicked
      map.current.on("click", closePopover);

      if (markers.length > 1) {
        const bounds = new mapboxgl.LngLatBounds();
        markers.forEach((marker) => {
          if (marker.lat && marker.lng) {
            bounds.extend([marker.lng, marker.lat]);
          }
        });
        map.current.fitBounds(bounds, { padding: 50 });
      }
    } catch (err) {
      console.error("Map initialization error:", err);
    }

    return () => {
      if (map.current) {
        map?.current.remove();
        map.current = null;
      }
    };
  }, [markers, center, zoom, handleMarkerClick, closePopover, activeMarker]);

  return (
    <div className="w-full md:w-1/2 relative">
      <div
        ref={mapContainer}
        className="h-[400px] w-full rounded-lg shadow-lg bg-gray-200 relative"
        onClick={closePopover}
      >
        {activeMarker && (
          <ProductPopover
            products={activeMarker.products}
            position={popoverPosition}
            onClose={closePopover}
          />
        )}
      </div>
    </div>
  );
};

export default FindNearMap;
