'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, ClipboardList, TrendingUp, Users, InfoIcon, Check, Globe } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

const generateRandomData = () => {
  const data = []
  for (let i = 0; i < 52; i++) {
    const week = []
    for (let j = 0; j < 7; j++) {
      week.push(Math.floor(Math.random() * 5))
    }
    data.push(week)
  }
  return data
}

const colorScale = (value: number) => {
  const colors = [
    "bg-primary/10",
    "bg-primary/30",
    "bg-primary/50",
    "bg-primary/70",
    "bg-primary/90"
  ]
  return colors[value] || "bg-gray-100"
}

const Heatmap = ({ data, titleFn }: { data: number[][], titleFn: (i: number, j: number, value: number) => string }) => {
  return (
    <div className="flex flex-wrap gap-1">
      {data.map((week, i) => (
        <div key={i} className="flex flex-col gap-1">
          {week.map((value, j) => (
            <div
              key={`${i}-${j}`}
              className={`w-2 h-2 rounded-sm ${colorScale(value)}`}
              title={titleFn(i, j, value)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

const Legend = ({ label }: { label: string }) => {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <span>Less</span>
      {[0, 1, 2, 3, 4].map((value) => (
        <div key={value} className={`w-3 h-3 rounded-sm ${colorScale(value)}`} />
      ))}
      <span>More</span>
      <span className="ml-2">{label}</span>
    </div>
  )
}

const PricingCard = ({ title, price, features, isPopular = false }) => (
  <Card className={`flex flex-col ${isPopular ? 'border-primary' : ''}`}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>
        <span className="text-3xl font-bold">${price}</span> / month
      </CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="mr-2 h-4 w-4 text-primary" />
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
    <CardContent>
      <Button className="w-full" variant={isPopular ? "default" : "outline"}>
        Join Waiting List
      </Button>
    </CardContent>
  </Card>
)

const AnimatedHeatmaps = () => {
  const [exerciseData, setExerciseData] = useState(generateRandomData())
  const [painData, setPainData] = useState(generateRandomData())

  useEffect(() => {
    const interval = setInterval(() => {
      setExerciseData(prevData => {
        const newData = [...prevData]
        const randomWeek = Math.floor(Math.random() * 52)
        const randomDay = Math.floor(Math.random() * 7)
        newData[randomWeek][randomDay] = Math.floor(Math.random() * 5)
        return newData
      })

      setPainData(prevData => {
        const newData = [...prevData]
        const randomWeek = Math.floor(Math.random() * 52)
        const randomDay = Math.floor(Math.random() * 7)
        newData[randomWeek][randomDay] = Math.floor(Math.random() * 5)
        return newData
      })
    }, 1000) // Update every second

    return () => clearInterval(interval)
  }, [])

  return (
    <Tabs defaultValue="exercise" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="exercise">Exercise Adherence</TabsTrigger>
        <TabsTrigger value="pain">Pain Levels</TabsTrigger>
      </TabsList>
      <TabsContent value="exercise" className="space-y-4">
        <Heatmap 
          data={exerciseData} 
          titleFn={(i, j, value) => `Week ${i + 1}, Day ${j + 1}: ${value} exercises completed`}
        />
        <Legend label="Exercise Completion" />
      </TabsContent>
      <TabsContent value="pain" className="space-y-4">
        <Heatmap 
          data={painData} 
          titleFn={(i, j, value) => `Week ${i + 1}, Day ${j + 1}: Pain level ${value}`}
        />
        <Legend label="Pain Level" />
      </TabsContent>
    </Tabs>
  )
}

export function LandingPageWithAnimatedHeatmaps() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <Activity className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">PhysioTrack</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            About
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Revolutionize Your Physiotherapy Practice
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Create personalized exercise plans, track patient progress, and expand your clinic's reach with
                  PhysioTrack - the all-in-one solution for modern physiotherapists.
                </p>
              </div>
              <div className="space-x-4">
                <Button size="lg">Join Waiting List</Button>
                <Button variant="outline" size="lg">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <ClipboardList className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Customized Exercise Plans</CardTitle>
                </CardHeader>
                <CardContent>
                  Create tailored exercise regimens for each patient, expanding your service offerings and attracting more clients.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Progress Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  Monitor patient progress over time, showcasing your clinic's effectiveness and encouraging patient retention.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="h-8 w-8 mb-2 text-primary" />
                  <CardTitle>Patient Management</CardTitle>
                </CardHeader>
                <CardContent>
                  Efficiently manage your patient roster, allowing you to handle more clients and grow your practice.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Visualize Patient Progress
                  </h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Our intuitive heatmap visualizations allow you to quickly assess patient adherence, pain levels, and overall progress over time, 
                    helping you demonstrate value to your clients and partners.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    Identify patterns in exercise adherence and pain levels
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    Track long-term progress effortlessly
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-primary" />
                    Adjust treatment plans based on visual data
                  </li>
                  <li className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-primary" />
                    Expand your reach with data-driven insights
                  </li>
                </ul>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Patient Progress Visualization</CardTitle>
                  <CardDescription>52-week heatmaps showing exercise adherence and pain levels</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnimatedHeatmaps />
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      <InfoIcon className="w-4 h-4 mr-2" />
                      Learn more
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Pricing Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <PricingCard
                title="Basic"
                price={29}
                features={[
                  "Up to 50 patients",
                  "Basic exercise library",
                  "Progress tracking",
                  "Email support",
                  "Expand your local reach"
                ]}
              />
              <PricingCard
                title="Pro"
                price={79}
                features={[
                  "Up to 200 patients",
                  "Advanced exercise library",
                  "Custom exercise creation",
                  "Priority email & chat support",
                  "Grow your regional presence"
                ]}
                isPopular={true}
              />
              <PricingCard
                title="Enterprise"
                price={199}
                features={[
                  "Unlimited patients",
                  "Full exercise library",
                  "Custom branding",
                  "24/7 phone & email support",
                  "Establish a national footprint"
                ]}
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Expand Your Clinic's Reach?
                </h2>
                <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl">
                  Join our waiting list today and be among the first to revolutionize your practice, attract more clients, 
                  and establish a wider footprint in the physiotherapy industry!
                </p>
              </div>
              <Button variant="secondary" size="lg">
                Join the Waiting List
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2023 PhysioTrack. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}