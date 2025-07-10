import React, { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

// Types
interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  serverLink: string;
  serverName: string;
  serverAvatar: string;
  memberCount: number;
  views: number;
  contactClicks: number;
  serverLinkClicks: number;
  isPinned: boolean;
  isOwner: boolean;
  createdAt: string;
  pricingDetails: string[];
}

// Mock data
const mockListings: Listing[] = [
  {
    id: "1",
    title: "Ad on MIKU TAG",
    description:
      "Ping Prices\n• 1 Day @here - $100\n• 1 Day @everyone - $150\n\n• Bundle Deals\n• 7d @everyone with Ping On Join - $300\n• 7d @everyone with Join DM - $350\n• 7d @everyone with Ping On Join & Join DM - $400\n\n• Write to discord - allanwood",
    price: 100,
    currency: "USD",
    category: "Anime",
    serverLink: "https://discord.gg/mikutag",
    serverName: "MIKU TAG",
    serverAvatar: "/api/placeholder/40/40",
    memberCount: 15420,
    views: 234,
    contactClicks: 12,
    serverLinkClicks: 45,
    isPinned: true,
    isOwner: false,
    createdAt: "7/10/2025",
    pricingDetails: ["1 Day @here - $100", "1 Day @everyone - $150"],
  },
  {
    id: "2",
    title: '"окак" тег',
    description:
      "Реклама в самом верху сервера в отдельном канале. с розыгрышем и пингом @everyone\nРеклама размещается на 7 дней",
    price: 2500,
    currency: "RUB",
    category: "Communication / Meeting",
    serverLink: "https://discord.gg/okak",
    serverName: '"окак"',
    serverAvatar: "/api/placeholder/40/40",
    memberCount: 21312,
    views: 156,
    contactClicks: 8,
    serverLinkClicks: 23,
    isPinned: false,
    isOwner: false,
    createdAt: "7/10/2025",
    pricingDetails: ["7 days @everyone - 2500 RUB"],
  },
  {
    id: "3",
    title: 'Реклама на русскоязычном сервере "pivko"',
    description:
      "Реклама в самом верху сервера в отдельном канале. с розыгрышем и пингом @everyone\nРеклама размещается на 7 дней",
    price: 2000,
    currency: "RUB",
    category: "Communication / Meeting",
    serverLink: "https://discord.gg/pivko",
    serverName: "пивасик",
    serverAvatar: "/api/placeholder/40/40",
    memberCount: 18750,
    views: 89,
    contactClicks: 3,
    serverLinkClicks: 12,
    isPinned: false,
    isOwner: true,
    createdAt: "7/10/2025",
    pricingDetails: ["7 days @everyone - 2000 RUB"],
  },
];

const categories = [
  "Gaming",
  "Finance",
  "Education",
  "Music",
  "IT",
  "Anime",
  "Politics",
  "Communication / Meeting",
  "VPN",
  "Programming",
  "RP",
];

const currencies = ["USD", "EUR", "RUB", "LTC"];

const translations = {
  en: {
    title: "Discord Ads Board",
    listings: "Listings",
    myListings: "My Listings",
    addListing: "Add Listing",
    categories: "Categories",
    currency: "Currency",
    sorting: "Sorting",
    reset: "Reset",
    newest: "Newest",
    cheapest: "Cheapest",
    mostExpensive: "Most Expensive",
    contact: "Contact",
    edit: "Edit",
    delete: "Delete",
    pin: "Pin",
    unpin: "Unpin",
    views: "views",
    clicks: "clicks",
    members: "members",
    pinned: "Pinned",
    addNewListing: "Add New Listing",
    title_field: "Title",
    description_field: "Description",
    serverLink: "Server Link",
    category: "Category",
    price: "Price",
    publish: "Publish",
    cancel: "Cancel",
    adminMode: "Admin Mode",
  },
  ru: {
    title: "Discord Ads Board",
    listings: "Объявления",
    myListings: "Мои объявления",
    addListing: "Добавить объявление",
    categories: "Категории",
    currency: "Валюта",
    sorting: "Сортировка",
    reset: "Сбросить",
    newest: "Новые",
    cheapest: "Дешевые",
    mostExpensive: "Дорогие",
    contact: "Связаться",
    edit: "Редактировать",
    delete: "Удалить",
    pin: "Закрепить",
    unpin: "Открепить",
    views: "просмотров",
    clicks: "кликов",
    members: "участников",
    pinned: "Закреплено",
    addNewListing: "Добавить объявление",
    title_field: "Заголовок",
    description_field: "Описание",
    serverLink: "Ссылка на сервер",
    category: "Категория",
    price: "Цена",
    publish: "Опубликовать",
    cancel: "Отмена",
    adminMode: "Админ-режим",
  },
};

export default function DiscordAdsBoard() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState<"en" | "ru">("en");
  const [adminMode, setAdminMode] = useState(false);
  const [activeTab, setActiveTab] = useState("listings");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [listings, setListings] = useState<Listing[]>(mockListings);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingListing, setEditingListing] = useState<Listing | null>(null);
  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    price: "",
    currency: "USD",
    category: "",
    serverLink: "",
  });

  const t = translations[language];

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category]);
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    }
  };

  const handleReset = () => {
    setSelectedCategories([]);
    setSelectedCurrency("");
    setSortBy("newest");
  };

  const handleAddListing = () => {
    if (
      !newListing.title ||
      !newListing.description ||
      !newListing.price ||
      !newListing.category ||
      !newListing.serverLink
    ) {
      return;
    }

    const listing: Listing = {
      id: Date.now().toString(),
      title: newListing.title,
      description: newListing.description,
      price: Number(newListing.price),
      currency: newListing.currency,
      category: newListing.category,
      serverLink: newListing.serverLink,
      serverName: newListing.title.split(" ")[0],
      serverAvatar: "/api/placeholder/40/40",
      memberCount: Math.floor(Math.random() * 50000) + 1000,
      views: 0,
      contactClicks: 0,
      serverLinkClicks: 0,
      isPinned: false,
      isOwner: true,
      createdAt: new Date().toLocaleDateString(),
      pricingDetails: [],
    };

    setListings([listing, ...listings]);
    setNewListing({
      title: "",
      description: "",
      price: "",
      currency: "USD",
      category: "",
      serverLink: "",
    });
    setIsAddDialogOpen(false);
  };

  const handleEditListing = (listing: Listing) => {
    setEditingListing(listing);
    setNewListing({
      title: listing.title,
      description: listing.description,
      price: listing.price.toString(),
      currency: listing.currency,
      category: listing.category,
      serverLink: listing.serverLink,
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateListing = () => {
    if (!editingListing) return;

    const updatedListings = listings.map((listing) =>
      listing.id === editingListing.id
        ? {
            ...listing,
            title: newListing.title,
            description: newListing.description,
            price: Number(newListing.price),
            currency: newListing.currency,
            category: newListing.category,
            serverLink: newListing.serverLink,
          }
        : listing,
    );

    setListings(updatedListings);
    setIsEditDialogOpen(false);
    setEditingListing(null);
    setNewListing({
      title: "",
      description: "",
      price: "",
      currency: "USD",
      category: "",
      serverLink: "",
    });
  };

  const handleDeleteListing = (id: string) => {
    setListings(listings.filter((listing) => listing.id !== id));
  };

  const handlePinListing = (id: string) => {
    setListings(
      listings.map((listing) =>
        listing.id === id
          ? { ...listing, isPinned: !listing.isPinned }
          : listing,
      ),
    );
  };

  const handleContact = (id: string) => {
    setListings(
      listings.map((listing) =>
        listing.id === id
          ? { ...listing, contactClicks: listing.contactClicks + 1 }
          : listing,
      ),
    );
  };

  const handleServerClick = (id: string) => {
    setListings(
      listings.map((listing) =>
        listing.id === id
          ? { ...listing, serverLinkClicks: listing.serverLinkClicks + 1 }
          : listing,
      ),
    );
  };

  const filteredListings = useMemo(() => {
    let filtered = listings;

    // Filter by tab
    if (activeTab === "myListings") {
      filtered = filtered.filter((listing) => listing.isOwner);
    }

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((listing) =>
        selectedCategories.includes(listing.category),
      );
    }

    // Filter by currency
    if (selectedCurrency) {
      filtered = filtered.filter(
        (listing) => listing.currency === selectedCurrency,
      );
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else if (sortBy === "cheapest") {
        return a.price - b.price;
      } else if (sortBy === "mostExpensive") {
        return b.price - a.price;
      }
      return 0;
    });

    // Pin to top
    const pinned = filtered.filter((listing) => listing.isPinned);
    const unpinned = filtered.filter((listing) => !listing.isPinned);

    return [...pinned, ...unpinned];
  }, [listings, activeTab, selectedCategories, selectedCurrency, sortBy]);

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-[#2C2F33] text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Header */}
      <header
        className={`${theme === "dark" ? "bg-[#23272A] border-gray-700" : "bg-white border-gray-200"} border-b px-4 py-3`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-[#5865F2] p-2 rounded-lg">
              <Icon name="MessageSquare" size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold">{t.title}</h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Select
              value={language}
              onValueChange={(value: "en" | "ru") => setLanguage(value)}
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">EN</SelectItem>
                <SelectItem value="ru">RU</SelectItem>
              </SelectContent>
            </Select>

            {/* Admin Mode Toggle */}
            <div className="flex items-center space-x-2">
              <Icon
                name="Shield"
                size={20}
                className={adminMode ? "text-[#5865F2]" : "text-gray-400"}
              />
              <Switch checked={adminMode} onCheckedChange={setAdminMode} />
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Icon name={theme === "dark" ? "Sun" : "Moon"} size={20} />
            </Button>

            {/* Add Listing Button */}
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#5865F2] hover:bg-[#4752C4] text-white">
                  <Icon name="Plus" size={16} className="mr-2" />
                  {t.addListing}
                </Button>
              </DialogTrigger>
              <DialogContent
                className={`${theme === "dark" ? "bg-[#2C2F33] text-white border-gray-600" : "bg-white"} max-w-md`}
              >
                <DialogHeader>
                  <DialogTitle>{t.addNewListing}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="title">{t.title_field}</Label>
                    <Input
                      id="title"
                      placeholder="Brief description of the offer"
                      value={newListing.title}
                      onChange={(e) =>
                        setNewListing({ ...newListing, title: e.target.value })
                      }
                      className={
                        theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">{t.description_field}</Label>
                    <Textarea
                      id="description"
                      placeholder="Detailed description of the advertising offer"
                      value={newListing.description}
                      onChange={(e) =>
                        setNewListing({
                          ...newListing,
                          description: e.target.value,
                        })
                      }
                      className={
                        theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="serverLink">{t.serverLink}</Label>
                    <Input
                      id="serverLink"
                      placeholder="https://discord.gg/server"
                      value={newListing.serverLink}
                      onChange={(e) =>
                        setNewListing({
                          ...newListing,
                          serverLink: e.target.value,
                        })
                      }
                      className={
                        theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">{t.category}</Label>
                    <Select
                      value={newListing.category}
                      onValueChange={(value) =>
                        setNewListing({ ...newListing, category: value })
                      }
                    >
                      <SelectTrigger
                        className={
                          theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                        }
                      >
                        <SelectValue placeholder="Gaming, IT, Finance" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Label htmlFor="price">{t.price}</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="5,000"
                        value={newListing.price}
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            price: e.target.value,
                          })
                        }
                        className={
                          theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                        }
                      />
                    </div>
                    <div className="w-20">
                      <Label>&nbsp;</Label>
                      <Select
                        value={newListing.currency}
                        onValueChange={(value) =>
                          setNewListing({ ...newListing, currency: value })
                        }
                      >
                        <SelectTrigger
                          className={
                            theme === "dark"
                              ? "bg-[#36393F] border-gray-600"
                              : ""
                          }
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((currency) => (
                            <SelectItem key={currency} value={currency}>
                              {currency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    onClick={handleAddListing}
                    className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
                  >
                    {t.publish}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList
            className={`${theme === "dark" ? "bg-[#36393F] border-gray-600" : "bg-white border-gray-200"} border rounded-lg`}
          >
            <TabsTrigger
              value="listings"
              className="flex items-center space-x-2"
            >
              <Icon name="List" size={16} />
              <span>{t.listings}</span>
            </TabsTrigger>
            <TabsTrigger
              value="myListings"
              className="flex items-center space-x-2"
            >
              <Icon name="User" size={16} />
              <span>{t.myListings}</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t.categories}</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) =>
                      handleCategoryChange(category, checked as boolean)
                    }
                  />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Currency */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t.currency}</h3>
            <div className="flex flex-wrap gap-2">
              {currencies.map((currency) => (
                <Button
                  key={currency}
                  variant={
                    selectedCurrency === currency ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setSelectedCurrency(
                      selectedCurrency === currency ? "" : currency,
                    )
                  }
                  className={
                    selectedCurrency === currency
                      ? "bg-[#5865F2] text-white"
                      : ""
                  }
                >
                  {currency}
                </Button>
              ))}
            </div>
          </div>

          {/* Sorting */}
          <div>
            <h3 className="text-lg font-semibold mb-3">{t.sorting}</h3>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger
                className={
                  theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                }
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">{t.newest}</SelectItem>
                <SelectItem value="cheapest">{t.cheapest}</SelectItem>
                <SelectItem value="mostExpensive">{t.mostExpensive}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Controls */}
          <div className="flex flex-col space-y-3">
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center space-x-2"
            >
              <Icon name="RotateCcw" size={16} />
              <span>{t.reset}</span>
            </Button>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Icon name="Grid3X3" size={16} />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <Icon name="List" size={16} />
              </Button>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredListings.map((listing) => (
            <Card
              key={listing.id}
              className={`${theme === "dark" ? "bg-[#36393F] border-gray-600" : "bg-white"} hover:shadow-lg transition-shadow ${listing.isPinned ? "ring-2 ring-[#5865F2]" : ""}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      {listing.isPinned && (
                        <Badge
                          variant="secondary"
                          className="bg-[#5865F2] text-white"
                        >
                          <Icon name="Pin" size={12} className="mr-1" />
                          {t.pinned}
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{listing.title}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <img
                        src={listing.serverAvatar}
                        alt={listing.serverName}
                        className="w-6 h-6 rounded-full"
                      />
                      <button
                        onClick={() => handleServerClick(listing.id)}
                        className="text-[#5865F2] hover:underline font-medium"
                      >
                        {listing.serverName}
                      </button>
                      <span className="text-sm text-gray-500">
                        {listing.serverLink}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-[#5865F2]">
                      {listing.price.toLocaleString()} {listing.currency}
                    </div>
                    <div className="text-sm text-gray-500">
                      {listing.createdAt}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 whitespace-pre-line">
                  {listing.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <img
                      src={listing.serverAvatar}
                      alt={listing.serverName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div>
                      <div className="font-medium">{listing.serverName}</div>
                      <div className="text-sm text-gray-500">
                        <Icon name="Users" size={12} className="inline mr-1" />
                        {listing.memberCount.toLocaleString()} •{" "}
                        {listing.category}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary">{listing.category}</Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{listing.memberCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} />
                      <span>{listing.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MousePointer" size={14} />
                      <span>{listing.contactClicks}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <Button
                    size="sm"
                    onClick={() => handleContact(listing.id)}
                    className="bg-[#5865F2] hover:bg-[#4752C4] text-white"
                  >
                    <Icon name="MessageCircle" size={14} className="mr-2" />
                    {t.contact}
                  </Button>

                  <div className="flex items-center space-x-2">
                    {(adminMode || listing.isOwner) && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditListing(listing)}
                        >
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteListing(listing.id)}
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </>
                    )}
                    {adminMode && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handlePinListing(listing.id)}
                      >
                        <Icon
                          name={listing.isPinned ? "PinOff" : "Pin"}
                          size={14}
                        />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent
            className={`${theme === "dark" ? "bg-[#2C2F33] text-white border-gray-600" : "bg-white"} max-w-md`}
          >
            <DialogHeader>
              <DialogTitle>{t.edit}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-title">{t.title_field}</Label>
                <Input
                  id="edit-title"
                  value={newListing.title}
                  onChange={(e) =>
                    setNewListing({ ...newListing, title: e.target.value })
                  }
                  className={
                    theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-description">{t.description_field}</Label>
                <Textarea
                  id="edit-description"
                  value={newListing.description}
                  onChange={(e) =>
                    setNewListing({
                      ...newListing,
                      description: e.target.value,
                    })
                  }
                  className={
                    theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-serverLink">{t.serverLink}</Label>
                <Input
                  id="edit-serverLink"
                  value={newListing.serverLink}
                  onChange={(e) =>
                    setNewListing({ ...newListing, serverLink: e.target.value })
                  }
                  className={
                    theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                  }
                />
              </div>
              <div>
                <Label htmlFor="edit-category">{t.category}</Label>
                <Select
                  value={newListing.category}
                  onValueChange={(value) =>
                    setNewListing({ ...newListing, category: value })
                  }
                >
                  <SelectTrigger
                    className={
                      theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                    }
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label htmlFor="edit-price">{t.price}</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={newListing.price}
                    onChange={(e) =>
                      setNewListing({ ...newListing, price: e.target.value })
                    }
                    className={
                      theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                    }
                  />
                </div>
                <div className="w-20">
                  <Label>&nbsp;</Label>
                  <Select
                    value={newListing.currency}
                    onValueChange={(value) =>
                      setNewListing({ ...newListing, currency: value })
                    }
                  >
                    <SelectTrigger
                      className={
                        theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                      }
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency} value={currency}>
                          {currency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleUpdateListing}
                className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white"
              >
                {t.publish}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
