import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Icon from "@/components/ui/icon";

interface Listing {
  id: string;
  title: string;
  description: string;
  serverLink: string;
  category: string;
  price: number;
  currency: string;
  serverName: string;
  memberCount: number;
  avatar: string;
  views: number;
  clicks: number;
  isPinned: boolean;
  isOwner: boolean;
  isPremium: boolean;
  createdAt: string;
}

const Index = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState<"ru" | "en">("ru");
  const [adminMode, setAdminMode] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "cheapest" | "expensive">(
    "newest",
  );
  const [activeTab, setActiveTab] = useState<"listings" | "my-listings">(
    "listings",
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const togglePremium = (listingId: string) => {
    // В реальном приложении здесь будет API-вызов
    console.log(`Toggling premium for listing ${listingId}`);
  };

  const togglePin = (listingId: string) => {
    // В реальном приложении здесь будет API-вызов
    console.log(`Toggling pin for listing ${listingId}`);
  };

  const toggleFavorite = (listingId: string) => {
    // В реальном приложении здесь будет API-вызов
    console.log(`Toggling favorite for listing ${listingId}`);
  };

  const categories = [
    { id: "all", name: { ru: "Все", en: "All" } },
    { id: "gaming", name: { ru: "Игры", en: "Gaming" } },
    { id: "anime", name: { ru: "Аниме", en: "Anime" } },
    { id: "music", name: { ru: "Музыка", en: "Music" } },
    { id: "education", name: { ru: "Образование", en: "Education" } },
    { id: "tech", name: { ru: "Технологии", en: "Tech" } },
    { id: "community", name: { ru: "Сообщество", en: "Community" } },
  ];

  const currencies = ["USD", "EUR", "RUB", "LTC"];

  const mockListings: Listing[] = [
    {
      id: "1",
      title: "Ad on MIKU TAG",
      description:
        "Реклама в самом верху сервера в отдельном канале, с розыгрышем и пингом @everyone",
      serverLink: "https://discord.gg/mikutag",
      category: "anime",
      price: 100,
      currency: "USD",
      serverName: "MIKU TAG",
      memberCount: 21312,
      avatar: "🎵",
      views: 245,
      clicks: 34,
      isPinned: true,
      isOwner: true,
      isPremium: true,
      createdAt: "2025-01-07",
    },
    {
      id: "2",
      title: '"окак" тег',
      description:
        "Реклама в самом верху сервера в отдельном канале, с розыгрышем и пингом @everyone. Реклама размещается на 7 дней",
      serverLink: "https://discord.gg/okak",
      category: "community",
      price: 2500,
      currency: "RUB",
      serverName: '"окак"',
      memberCount: 15423,
      avatar: "💎",
      views: 189,
      clicks: 27,
      isPinned: false,
      isOwner: false,
      isPremium: false,
      createdAt: "2025-01-06",
    },
    {
      id: "3",
      title: 'Реклама на русскоязычном сервере "pivko"',
      description:
        "Реклама в самом верху сервера в отдельном канале, с розыгрышем и пингом @everyone. Реклама размещается на 7 дней",
      serverLink: "https://discord.gg/pivko",
      category: "gaming",
      price: 2000,
      currency: "RUB",
      serverName: "pivko",
      memberCount: 8945,
      avatar: "🍺",
      views: 156,
      clicks: 19,
      isPinned: false,
      isOwner: false,
      isPremium: false,
      createdAt: "2025-01-05",
    },
  ];

  const text = {
    ru: {
      title: "Discord Ads Board",
      listings: "Объявления",
      myListings: "Мои объявления",
      categories: "Категории",
      currency: "Валюта",
      sorting: "Сортировка",
      newest: "Новые",
      cheapest: "Дешевые",
      expensive: "Дорогие",
      reset: "Сброс",
      addListing: "Добавить объявление",
      contact: "Связаться",
      edit: "Изменить",
      delete: "Удалить",
      pin: "Закрепить",
      unpin: "Открепить",
      premium: "Премиум",
      unpremium: "Снять премиум",
      views: "просмотров",
      clicks: "кликов",
      members: "участников",
      addNewListing: "Добавить новое объявление",
      title_field: "Заголовок",
      description_field: "Описание",
      serverLink_field: "Ссылка на сервер",
      category_field: "Категория",
      price_field: "Цена",
      publish: "Опубликовать",
    },
    en: {
      title: "Discord Ads Board",
      listings: "Listings",
      myListings: "My Listings",
      categories: "Categories",
      currency: "Currency",
      sorting: "Sorting",
      newest: "Newest",
      cheapest: "Cheapest",
      expensive: "Most Expensive",
      reset: "Reset",
      addListing: "Add Listing",
      contact: "Contact",
      edit: "Edit",
      delete: "Delete",
      pin: "Pin",
      unpin: "Unpin",
      premium: "Premium",
      unpremium: "Remove Premium",
      views: "views",
      clicks: "clicks",
      members: "members",
      addNewListing: "Add New Listing",
      title_field: "Title",
      description_field: "Description",
      serverLink_field: "Server Link",
      category_field: "Category",
      price_field: "Price",
      publish: "Publish",
    },
  };

  const t = text[language];

  const filteredListings = mockListings
    .filter((listing) => {
      if (selectedCategory !== "all" && listing.category !== selectedCategory)
        return false;
      if (activeTab === "my-listings" && !listing.isOwner) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "cheapest":
          return a.price - b.price;
        case "expensive":
          return b.price - a.price;
        default:
          return 0;
      }
    });

  const resetFilters = () => {
    setSelectedCategory("all");
    setSortBy("newest");
  };

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-[#2C2F33] text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Header */}
      <header
        className={`border-b ${theme === "dark" ? "border-gray-700 bg-[#23272A]" : "border-gray-200 bg-white"} px-4 py-3`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#5865F2] rounded-lg flex items-center justify-center text-white font-bold text-sm">
              Ad
            </div>
            <h1 className="text-xl font-bold">{t.title}</h1>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  {language.toUpperCase()}
                  <Icon name="ChevronDown" size={16} className="ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setLanguage("ru")}>
                  Русский
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage("en")}>
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Admin Mode Toggle */}
            <Button
              variant={adminMode ? "default" : "outline"}
              size="sm"
              onClick={() => setAdminMode(!adminMode)}
            >
              <Icon name="Shield" size={16} />
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <Icon name={theme === "dark" ? "Sun" : "Moon"} size={16} />
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
                className={`${theme === "dark" ? "bg-[#2C2F33] text-white border-gray-600" : "bg-white"}`}
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
                      className={
                        theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="serverLink">{t.serverLink_field}</Label>
                    <Input
                      id="serverLink"
                      placeholder="https://discord.gg/server"
                      className={
                        theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">{t.category_field}</Label>
                    <Select>
                      <SelectTrigger
                        className={
                          theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                        }
                      >
                        <SelectValue placeholder="Gaming, IT, Finance" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name[language]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex space-x-2">
                    <div className="flex-1">
                      <Label htmlFor="price">{t.price_field}</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="5,000"
                        className={
                          theme === "dark" ? "bg-[#36393F] border-gray-600" : ""
                        }
                      />
                    </div>
                    <div className="w-24">
                      <Label htmlFor="currency">Currency</Label>
                      <Select>
                        <SelectTrigger
                          className={
                            theme === "dark"
                              ? "bg-[#36393F] border-gray-600"
                              : ""
                          }
                        >
                          <SelectValue placeholder="USD" />
                        </SelectTrigger>
                        <SelectContent>
                          {currencies.map((curr) => (
                            <SelectItem key={curr} value={curr}>
                              {curr}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white">
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
        <Tabs
          value={activeTab}
          onValueChange={(value) =>
            setActiveTab(value as "listings" | "my-listings")
          }
          className="mb-6"
        >
          <TabsList
            className={`${theme === "dark" ? "bg-[#36393F] border-gray-600" : "bg-white border-gray-200"} border`}
          >
            <TabsTrigger
              value="listings"
              className="flex items-center space-x-2"
            >
              <Icon name="List" size={16} />
              <span>{t.listings}</span>
            </TabsTrigger>
            <TabsTrigger
              value="my-listings"
              className="flex items-center space-x-2"
            >
              <Icon name="User" size={16} />
              <span>{t.myListings}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="listings" className="space-y-6">
            {/* Filters */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
              {/* Categories */}
              <div>
                <h3 className="text-sm font-medium mb-2">{t.categories}</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category.id}
                      variant={
                        selectedCategory === category.id ? "default" : "outline"
                      }
                      className={`cursor-pointer ${
                        selectedCategory === category.id
                          ? "bg-[#5865F2] text-white hover:bg-[#4752C4]"
                          : ""
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      {category.name[language]}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Currency Filter */}
              <div>
                <h3 className="text-sm font-medium mb-2">{t.currency}</h3>
                <div className="flex flex-wrap gap-2">
                  {currencies.map((curr) => (
                    <Badge
                      key={curr}
                      variant="outline"
                      className="cursor-pointer"
                    >
                      {curr}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Sorting */}
              <div>
                <h3 className="text-sm font-medium mb-2">{t.sorting}</h3>
                <Select
                  value={sortBy}
                  onValueChange={(value) => setSortBy(value as typeof sortBy)}
                >
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
                    <SelectItem value="expensive">{t.expensive}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Actions */}
              <div className="flex items-end space-x-2">
                <Button
                  variant="outline"
                  onClick={resetFilters}
                  className={
                    theme === "dark" ? "border-gray-600 hover:bg-[#36393F]" : ""
                  }
                >
                  <Icon name="RotateCcw" size={16} className="mr-2" />
                  {t.reset}
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    setViewMode(viewMode === "list" ? "grid" : "list")
                  }
                  className={
                    theme === "dark" ? "border-gray-600 hover:bg-[#36393F]" : ""
                  }
                >
                  <Icon
                    name={viewMode === "list" ? "Grid3X3" : "List"}
                    size={16}
                  />
                </Button>
              </div>
            </div>

            {/* Promo Card */}
            <div className="mb-6">
              <div className="bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg p-6 relative overflow-hidden">
                <div className="absolute top-4 right-4 text-white">
                  <div className="text-3xl font-bold">-35%</div>
                  <div className="text-sm opacity-90">Limited Time</div>
                </div>

                <div className="flex items-center space-x-2 mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
                    ⚡ SPECIAL PROMO
                  </div>
                  <div className="text-white text-xl font-bold">
                    35% OFF All Ad Placements!
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
                      <Icon name="Gamepad2" size={32} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-white font-bold text-lg">
                          Elite Gaming Hub
                        </h3>
                        <div className="bg-pink-500/70 backdrop-blur-sm rounded-full px-2 py-1 text-white text-xs">
                          gaming
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 text-white/90 text-sm">
                        <Icon name="Users" size={14} />
                        <span>52 847 members</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Gamepad2" size={16} className="text-white" />
                    <h4 className="text-white font-bold">
                      Elite Gaming Community
                    </h4>
                  </div>
                  <p className="text-white/90 text-sm">
                    Join our premium Discord server with exclusive gaming
                    content, tournaments, and active community of 50K+ members!
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-white/90 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="Eye" size={14} />
                      <span>15 420 views</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="MousePointer" size={14} />
                      <span>2 380 clicks</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button
                      variant="outline"
                      className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                    >
                      <Icon name="ExternalLink" size={16} className="mr-2" />
                      Visit Server
                    </Button>
                    <Button className="bg-white text-orange-500 hover:bg-white/90 font-medium">
                      <Icon name="MessageCircle" size={16} className="mr-2" />
                      Contact Owner
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-white/70 text-sm line-through">
                      2500 RUB
                    </span>
                    <span className="text-white text-2xl font-bold">
                      1625 RUB
                    </span>
                    <span className="text-white/90 text-sm">Save 875 RUB</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <p className="text-white font-medium bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg py-2 px-4">
                  Hurry up! This offer is valid for a limited time only. Create
                  your ad now and save 35%!
                </p>
              </div>
            </div>

            {/* Listings */}
            <div
              className={`grid gap-4 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {filteredListings.map((listing) => (
                <Card
                  key={listing.id}
                  className={`${
                    listing.isPremium
                      ? "bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-blue-500/10 border-2 border-transparent bg-clip-padding relative overflow-hidden"
                      : theme === "dark"
                        ? "bg-[#36393F] border-gray-600"
                        : "bg-white"
                  } hover:shadow-lg transition-all duration-300 ${
                    listing.isPremium ? "shadow-2xl" : ""
                  } p-4`}
                  style={
                    listing.isPremium
                      ? {
                          background:
                            theme === "dark"
                              ? "linear-gradient(135deg, rgba(139, 69, 19, 0.1) 0%, rgba(255, 20, 147, 0.1) 25%, rgba(138, 43, 226, 0.1) 50%, rgba(30, 144, 255, 0.1) 75%, rgba(0, 191, 255, 0.1) 100%)"
                              : "linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(255, 20, 147, 0.1) 25%, rgba(138, 43, 226, 0.1) 50%, rgba(30, 144, 255, 0.1) 75%, rgba(0, 191, 255, 0.1) 100%)",
                          boxShadow:
                            theme === "dark"
                              ? "0 0 30px rgba(139, 69, 19, 0.3), 0 0 60px rgba(255, 20, 147, 0.2)"
                              : "0 0 30px rgba(255, 215, 0, 0.3), 0 0 60px rgba(255, 20, 147, 0.2)",
                          border: "1px solid",
                          borderImage:
                            theme === "dark"
                              ? "linear-gradient(135deg, rgba(139, 69, 19, 0.5), rgba(255, 20, 147, 0.5), rgba(138, 43, 226, 0.5), rgba(30, 144, 255, 0.5), rgba(0, 191, 255, 0.5)) 1"
                              : "linear-gradient(135deg, rgba(255, 215, 0, 0.5), rgba(255, 20, 147, 0.5), rgba(138, 43, 226, 0.5), rgba(30, 144, 255, 0.5), rgba(0, 191, 255, 0.5)) 1",
                        }
                      : {}
                  }
                >
                  {/* Header Section */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3
                          className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                        >
                          {listing.title}
                        </h3>
                        {listing.isPremium && (
                          <Badge
                            variant="secondary"
                            className={`${
                              theme === "dark"
                                ? "bg-gradient-to-r from-yellow-600 to-orange-600 text-white border-yellow-500"
                                : "bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-yellow-300"
                            } shadow-lg`}
                          >
                            <Icon name="Crown" size={12} className="mr-1" />
                            Premium
                          </Badge>
                        )}
                        {listing.isPinned && (
                          <Badge
                            variant="secondary"
                            className={`${
                              theme === "dark"
                                ? "bg-yellow-900 text-yellow-200 border-yellow-700"
                                : "bg-yellow-100 text-yellow-800 border-yellow-300"
                            }`}
                          >
                            <Icon name="Pin" size={12} className="mr-1" />
                            Pinned
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-blue-400">
                        <span>{listing.serverName}</span>
                        <Button
                          variant="link"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300 p-0 h-auto text-sm"
                          onClick={() =>
                            window.open(listing.serverLink, "_blank")
                          }
                        >
                          {listing.serverLink}
                        </Button>
                      </div>
                      <div
                        className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"} mt-1`}
                      >
                        {new Date(listing.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-[#5865F2]">
                        {listing.price.toLocaleString()} {listing.currency}
                      </div>
                      <Button
                        size="sm"
                        className="bg-[#5865F2] hover:bg-[#4752C4] text-white mt-2"
                      >
                        <Icon name="MessageCircle" size={14} className="mr-1" />
                        {t.contact}
                      </Button>
                    </div>
                  </div>
                  {/* Description Section */}
                  <div className="mb-3">
                    <h4
                      className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-1`}
                    >
                      Ping Prices
                    </h4>
                    <div
                      className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"} space-y-1`}
                    >
                      <div>- 1 Day @here - $70</div>
                      <div>- 1 Day @everyone - $100</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4
                      className={`text-sm font-medium ${theme === "dark" ? "text-gray-300" : "text-gray-600"} mb-1`}
                    >
                      Bundle Deals
                    </h4>
                    <div
                      className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"} space-y-1`}
                    >
                      <div>- 7d @everyone with Ping On Join - $200</div>
                      <div>- 7d @everyone with Join DM - $250</div>
                      <div>
                        - 7d @everyone with Ping On Join & Join DM - $300
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div
                      className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                    >
                      • {listing.description}
                    </div>
                  </div>

                  {/* Bottom Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-[#5865F2] rounded flex items-center justify-center text-white text-xs">
                        {listing.avatar}
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span
                          className={`${theme === "dark" ? "text-white" : "text-gray-900"} font-medium`}
                        >
                          {listing.serverName}
                        </span>
                        <span
                          className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                        >
                          • CHAT • SOCIAL
                        </span>
                      </div>
                    </div>
                    <div
                      className={`flex items-center space-x-4 text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      <div className="flex items-center space-x-1">
                        <Icon name="Users" size={14} />
                        <span>{listing.memberCount.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MessageCircle" size={14} />
                        <span>
                          {
                            categories.find((c) => c.id === listing.category)
                              ?.name[language]
                          }
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={14} />
                        <span>{listing.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Heart" size={14} />
                        <span>{listing.favoriteCount}</span>
                      </div>
                    </div>
                  </div>

                  {/* Admin and Action Buttons */}
                  <div className="flex items-center justify-end space-x-2 mt-3">
                    {adminMode && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePremium(listing.id)}
                          title={listing.isPremium ? t.unpremium : t.premium}
                          className={
                            listing.isPremium
                              ? "text-yellow-500 hover:text-yellow-600"
                              : ""
                          }
                        >
                          <Icon
                            name={listing.isPremium ? "CrownOff" : "Crown"}
                            size={14}
                          />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => togglePin(listing.id)}
                          title={listing.isPinned ? t.unpin : t.pin}
                          className={
                            listing.isPinned
                              ? "text-yellow-500 hover:text-yellow-600"
                              : ""
                          }
                        >
                          <Icon
                            name={listing.isPinned ? "PinOff" : "Pin"}
                            size={14}
                          />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Icon name="Edit" size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-600"
                        >
                          <Icon name="Trash2" size={14} />
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFavorite(listing.id)}
                      title={
                        listing.isFavorited
                          ? t.removeFromFavorites
                          : t.addToFavorites
                      }
                      className={
                        listing.isFavorited
                          ? "text-red-500 hover:text-red-600"
                          : ""
                      }
                    >
                      <Icon
                        name={listing.isFavorited ? "Heart" : "HeartOff"}
                        size={14}
                      />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-listings" className="space-y-6">
            <div className="text-center py-8">
              <h2 className="text-xl font-bold mb-2">{t.myListings}</h2>
              <p
                className={`text-sm mb-4 ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Здесь отображаются только ваши объявления с возможностью
                редактирования
              </p>
            </div>

            {/* My Listings */}
            <div className="grid gap-4 grid-cols-1">
              {filteredListings
                .filter((l) => l.isOwner)
                .map((listing) => (
                  <Card
                    key={listing.id}
                    className={`${theme === "dark" ? "bg-[#36393F] border-gray-600" : "bg-white"} hover:shadow-lg transition-shadow`}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#5865F2] rounded-lg flex items-center justify-center text-white text-lg">
                            {listing.avatar}
                          </div>
                          <div>
                            <CardTitle className="text-lg">
                              {listing.title}
                            </CardTitle>
                            <CardDescription
                              className={`text-sm ${
                                theme === "dark"
                                  ? "text-gray-300"
                                  : "text-gray-700"
                              }`}
                            >
                              {listing.serverName} •{" "}
                              {listing.memberCount.toLocaleString()} {t.members}
                            </CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Icon name="Edit" size={14} className="mr-1" />
                            {t.edit}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:text-red-600"
                          >
                            <Icon name="Trash2" size={14} className="mr-1" />
                            {t.delete}
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p
                        className={`text-sm mb-4 ${
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {listing.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Icon
                              name="Eye"
                              size={14}
                              className={
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }
                            />
                            <span>
                              {listing.views} {t.views}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Icon
                              name="MousePointer"
                              size={14}
                              className={
                                theme === "dark"
                                  ? "text-gray-400"
                                  : "text-gray-500"
                              }
                            />
                            <span>
                              {listing.clicks} {t.clicks}
                            </span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-lg font-bold text-[#5865F2]">
                            {listing.price.toLocaleString()} {listing.currency}
                          </div>
                          <div
                            className={`text-xs ${
                              theme === "dark"
                                ? "text-gray-300"
                                : "text-gray-600"
                            }`}
                          >
                            {new Date(listing.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
