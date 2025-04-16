'use client';

import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import MarketDemandSection from '../../components/ui/MarketDemandSection';
import BusinessModelSection from '../../components/ui/BusinessModelSection';
import TokenSaleSection from '../../components/ui/TokenSaleSection';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import AnimatedQuote from '../../components/ui/AnimatedQuote';
import quotes from '../../data/quotes.json';
import { ResponsiveTable, ResponsiveTableBody, ResponsiveTableRow, ResponsiveTableCell } from "../../components/ui/responsive-table";

export default function SummaryPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <main>
        {/* Quote Header Section */}
        <div className="w-full bg-white dark:bg-gray-950 pt-16 overflow-hidden">
          <div className="w-full mx-auto">
            <div className="relative">
              <AnimatedQuote 
                quotes={quotes} 
                autoRotate={true} 
                rotationInterval={5000}
              />
            </div>
          </div>
        </div>
        
        {/* Editorial Header Section */}
        <div className="w-full bg-white dark:bg-gray-950">
          <div className="max-w-[1100px] mx-auto px-4 md:px-6 pb-16">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-gray-200 dark:border-gray-800 pb-12">
              <div className="md:col-span-6 flex flex-col justify-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 font-sora text-gray-900 dark:text-white">
                  EXECUTIVE SUMMARY
                </h1>
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>RWAi</span>
                  <span className="h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400"></span>
                  <span>{`${new Date().toLocaleString('default', { month: 'long' })} 2025`}</span>
                </div>
              </div>
              <div className="md:col-span-6 flex items-center">
                <div className="w-full h-[2px] bg-gray-900 dark:bg-white"></div>
              </div>
            </div>

            {/* Main Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mt-12">
              {/* Left Column - Main Text */}
              <div className="md:col-span-8">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
                    RWAi is the first platform where anyone can purchase fractional ownership and earn passive income from tokenized AI GPU rigs that run top open-source models like DeepSeek and Llama at state of the art AI data centers.
                  </p>
                  
                  <p className="mb-8">
                    By delivering inference and other AI optimized compute services to the rapidly growing AI market, our vertically integrated business model monetizes AI workload to create a rapid scaling ecosystem free from traditional high-capital-expenditure constraints, while generating an ongoing yield paid in USDC to our $RWAi token holders.
                  </p>
                  
                  <p className="mb-8">
                    This memo details the business model, including its operational structure, updated financial projections, competitive positioning, and growth potential to monetize an unprecedented supply crisis in the AI infrastructure field.
                  </p>
                </div>
              </div>
              
              {/* Right Column - Sidebar Info */}
              <div className="md:col-span-4 space-y-8">
                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">PLATFORM</h3>
                  <p className="text-lg font-medium">RWAi</p>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">FOCUS</h3>
                  <p className="text-lg font-medium">AI GPU Infrastructure</p>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-800 pt-6">
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">TOKEN</h3>
                  <p className="text-lg font-medium">$RWAi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Market Demand Section */}
        <div>
          <MarketDemandSection />
        </div>
        
        {/* Business Model Section */}
        <div>
          <BusinessModelSection />
        </div>
        
        {/* Token Sale Section */}
        <div className="pb-16">
          <TokenSaleSection />
        </div>
        
        {/* Revenue Modeling Section */}
        <div className="pb-16">
          <div className="w-full bg-gray-50 dark:bg-gray-900 py-16">
            <div className="max-w-[1100px] mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold mb-8 font-sora text-gray-900 dark:text-white">Revenue Modeling and Projections</h2>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="mb-6">
                  $RWAi Token holders generate income based on GPU utilization rate and service models. In addition, since we have no capital expense from training models, we are able to provide substantial savings to our users, while targeting high yield to our $RWAi holders.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Subscription Service + Model (Inference)</h3>
                    <p>
                      Our primary users will be based on a subscription model where customers receive a base level of monthly credits to use against our capacity and overage charges based on subscription plan level.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Shared (On-Demand) Inference</h3>
                    <p>
                      Users also have the ability to infer against our models on-demand, while still significantly lowering cost than competitors such as ChatGPT or Claude.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Dedicated GPUs (Rental)</h3>
                    <p>
                      For customers that prefer full GPU rental access, we offer lease models to optimize savings and flexibility. Currently projected at $12.80 per hour for an 8x H100 cluster, significantly below AWS's $32.40/hour which may be used for AI or alternative GPU demand.
                    </p>
                  </div>
                </div>
                
                {/* Unit Economic Projections */}
                <div className="mt-16">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Unit Economic Projections</h3>
                  
                  <p className="mb-6">
                    The table below presents annual revenue, costs, and profits for a single server at 33%, 50%, and 80% utilization, assuming a 50-50 split between rental and inference usage during active hours:
                  </p>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
                    <Tabs defaultValue="table" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="table">Table View</TabsTrigger>
                        <TabsTrigger value="chart">Bar Chart View</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="table" className="mt-2">
                        <ResponsiveTable
                          headers={[
                            "Metric",
                            "33% Utilization",
                            "50% Utilization",
                            "80% Utilization"
                          ]}
                        >
                          <ResponsiveTableBody>
                            <ResponsiveTableRow>
                              <ResponsiveTableCell>Total Revenue</ResponsiveTableCell>
                              <ResponsiveTableCell>$243,313</ResponsiveTableCell>
                              <ResponsiveTableCell>$355,778</ResponsiveTableCell>
                              <ResponsiveTableCell>$554,244</ResponsiveTableCell>
                            </ResponsiveTableRow>
                            <ResponsiveTableRow>
                              <ResponsiveTableCell>Expenses</ResponsiveTableCell>
                              <ResponsiveTableCell>$21,600.00</ResponsiveTableCell>
                              <ResponsiveTableCell>$21,600.00</ResponsiveTableCell>
                              <ResponsiveTableCell>$21,600.00</ResponsiveTableCell>
                            </ResponsiveTableRow>
                            <ResponsiveTableRow>
                              <ResponsiveTableCell>NOI</ResponsiveTableCell>
                              <ResponsiveTableCell>$221,713</ResponsiveTableCell>
                              <ResponsiveTableCell>$334,178</ResponsiveTableCell>
                              <ResponsiveTableCell>$532,644</ResponsiveTableCell>
                            </ResponsiveTableRow>
                          </ResponsiveTableBody>
                        </ResponsiveTable>
                      </TabsContent>
                      
                      <TabsContent value="chart" className="mt-2">
                        <div className="h-96 w-full flex flex-col">
                          <div className="flex flex-1 mb-8">
                            {/* 33% Utilization Bar */}
                            <div className="flex flex-col items-center justify-end w-1/3 px-4">
                              <div className="relative w-full max-w-[120px] flex flex-col items-center">
                                <div className="absolute top-0 w-full text-center text-sm font-medium">$221,713</div>
                                <div className="bg-green-500 dark:bg-green-600 w-full" style={{ height: 'calc(221713 * 0.00045px)' }}></div>
                                <div className="bg-red-500 dark:bg-red-600 w-full" style={{ height: 'calc(21600 * 0.00045px)' }}></div>
                                <div className="mt-2 text-xs text-center">33%</div>
                              </div>
                            </div>
                            
                            {/* 50% Utilization Bar */}
                            <div className="flex flex-col items-center justify-end w-1/3 px-4">
                              <div className="relative w-full max-w-[120px] flex flex-col items-center">
                                <div className="absolute top-0 w-full text-center text-sm font-medium">$334,178</div>
                                <div className="bg-green-500 dark:bg-green-600 w-full" style={{ height: 'calc(334178 * 0.00045px)' }}></div>
                                <div className="bg-red-500 dark:bg-red-600 w-full" style={{ height: 'calc(21600 * 0.00045px)' }}></div>
                                <div className="mt-2 text-xs text-center">50%</div>
                              </div>
                            </div>
                            
                            {/* 80% Utilization Bar */}
                            <div className="flex flex-col items-center justify-end w-1/3 px-4">
                              <div className="relative w-full max-w-[120px] flex flex-col items-center">
                                <div className="absolute top-0 w-full text-center text-sm font-medium">$532,644</div>
                                <div className="bg-green-500 dark:bg-green-600 w-full" style={{ height: 'calc(532644 * 0.00045px)' }}></div>
                                <div className="bg-red-500 dark:bg-red-600 w-full" style={{ height: 'calc(21600 * 0.00045px)' }}></div>
                                <div className="mt-2 text-xs text-center">80%</div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex justify-center mt-4 space-x-6 pb-4">
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-green-500 dark:bg-green-600 mr-2"></div>
                              <span className="text-sm">NOI</span>
                            </div>
                            <div className="flex items-center">
                              <div className="w-4 h-4 bg-red-500 dark:bg-red-600 mr-2"></div>
                              <span className="text-sm">Expenses</span>
                            </div>
                          </div>
                          
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">*At scale, with a mix of multiple server models, values may vary</p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      <span className="font-semibold">Notes:</span><br />
                      Rental Revenue: $12.80/hour, calculated for half of the utilized hours (e.g., 33% utilization = 1,445.4 hours/year).<br />
                      Inference Revenue: $138.24/hour at full capacity (460,800,000 tokens/hour × $0.3/million), scaled by utilization and split.<br />
                      Costs: 50% of Revenue (lease) + $21,600 (operations) annually.
                    </p>
                    
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Profitability at &lt; 33% utilization highlights the model's efficiency and resilience.
                    </p>
                  </div>
                  
                  {/* Company Metrics Section */}
                  <div className="mt-16">
                    <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Company Metrics</h3>
                    
                    <p className="mb-6">
                      For a server that grows from 33% utilization to 80% over 5 years, key financial metrics are:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                      <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-0 shadow-sm">
                        <h4 className="text-lg font-bold mb-0 pt-1 text-gray-900 dark:text-white">Net Present Value (NPV)</h4>
                        <p className="text-4xl font-bold text-green-600 dark:text-green-500 leading-none">$1,597,660</p>
                      </div>
                      
                      <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-0 shadow-sm">
                        <h4 className="text-lg font-bold mb-0 pt-1 text-gray-900 dark:text-white">Internal Rate of Return (IRR)</h4>
                        <p className="text-4xl font-bold text-green-600 dark:text-green-500 leading-none">~229%</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-0">indicating extremely robust returns</p>
                      </div>
                    </div>
                    
                    {/* Table 2: 5-Year Cash Flow Projection */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
                      <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white pt-0">
                        Table 2: 5-Year Cash Flow Projection (50% Utilization) Per H100 Server
                      </h4>
                      <p className="text-sm mb-4 text-gray-700 dark:text-gray-300">
                        Fractional GPU Token Holder Metrics (USD Lease)
                      </p>
                      
                      <ResponsiveTable
                        headers={[
                          "Year",
                          "Revenue Sale",
                          "Revenue Operations",
                          "Operations Expense",
                          "Net Cash Flow",
                          "DCF"
                        ]}
                      >
                        <ResponsiveTableBody>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>0</ResponsiveTableCell>
                            <ResponsiveTableCell>$0</ResponsiveTableCell>
                            <ResponsiveTableCell>$0</ResponsiveTableCell>
                            <ResponsiveTableCell>-$225,000</ResponsiveTableCell>
                            <ResponsiveTableCell>-$225,000</ResponsiveTableCell>
                            <ResponsiveTableCell>-$225,000.00</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>1</ResponsiveTableCell>
                            <ResponsiveTableCell>$400,000</ResponsiveTableCell>
                            <ResponsiveTableCell>$243,313</ResponsiveTableCell>
                            <ResponsiveTableCell>-$18,000</ResponsiveTableCell>
                            <ResponsiveTableCell>$625,313</ResponsiveTableCell>
                            <ResponsiveTableCell>$568,466.47</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>2</ResponsiveTableCell>
                            <ResponsiveTableCell>$0</ResponsiveTableCell>
                            <ResponsiveTableCell>$243,313</ResponsiveTableCell>
                            <ResponsiveTableCell>-$18,000</ResponsiveTableCell>
                            <ResponsiveTableCell>$225,313</ResponsiveTableCell>
                            <ResponsiveTableCell>$186,209.19</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>3</ResponsiveTableCell>
                            <ResponsiveTableCell>$0</ResponsiveTableCell>
                            <ResponsiveTableCell>$355,778</ResponsiveTableCell>
                            <ResponsiveTableCell>-$18,000</ResponsiveTableCell>
                            <ResponsiveTableCell>$337,778</ResponsiveTableCell>
                            <ResponsiveTableCell>$253,777.61</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>4</ResponsiveTableCell>
                            <ResponsiveTableCell>$0</ResponsiveTableCell>
                            <ResponsiveTableCell>$355,778</ResponsiveTableCell>
                            <ResponsiveTableCell>-$18,000</ResponsiveTableCell>
                            <ResponsiveTableCell>$337,778</ResponsiveTableCell>
                            <ResponsiveTableCell>$230,706.92</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>5</ResponsiveTableCell>
                            <ResponsiveTableCell>$0</ResponsiveTableCell>
                            <ResponsiveTableCell>$554,244</ResponsiveTableCell>
                            <ResponsiveTableCell>-$18,000</ResponsiveTableCell>
                            <ResponsiveTableCell>$536,244</ResponsiveTableCell>
                            <ResponsiveTableCell>$332,965.33</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>Salvage Repurchase</ResponsiveTableCell>
                            <ResponsiveTableCell></ResponsiveTableCell>
                            <ResponsiveTableCell></ResponsiveTableCell>
                            <ResponsiveTableCell></ResponsiveTableCell>
                            <ResponsiveTableCell>-$80,000</ResponsiveTableCell>
                            <ResponsiveTableCell>-$49,673.71</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow className="bg-gray-50 dark:bg-gray-700">
                            <ResponsiveTableCell className="font-bold">Total</ResponsiveTableCell>
                            <ResponsiveTableCell className="font-bold">$400,000</ResponsiveTableCell>
                            <ResponsiveTableCell className="font-bold">$1,752,426</ResponsiveTableCell>
                            <ResponsiveTableCell className="font-bold">-$315,000</ResponsiveTableCell>
                            <ResponsiveTableCell className="font-bold">$1,757,426</ResponsiveTableCell>
                            <ResponsiveTableCell className="font-bold">$1,597,660</ResponsiveTableCell>
                          </ResponsiveTableRow>
                        </ResponsiveTableBody>
                      </ResponsiveTable>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                        *At scale, with a mix of multiple server models, values may vary
                      </p>
                    </div>
                    
                    {/* Table 3: Fractional GPU Token Holder Metrics */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
                      <h4 className="text-lg font-bold mb-4 text-gray-900 dark:text-white pt-0">
                        Table 3: Fractional GPU Token Holder Metrics 5 Year Cash Flow from NOI share
                      </h4>
                      
                      <ResponsiveTable
                        headers={[
                          "Year",
                          "Revenue from NOI Share",
                          "Net Cash Flow",
                          "DCF"
                        ]}
                      >
                        <ResponsiveTableBody>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>0</ResponsiveTableCell>
                            <ResponsiveTableCell>$0</ResponsiveTableCell>
                            <ResponsiveTableCell>-$400,000.00</ResponsiveTableCell>
                            <ResponsiveTableCell>-$400,000.00</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>1</ResponsiveTableCell>
                            <ResponsiveTableCell>$202,782</ResponsiveTableCell>
                            <ResponsiveTableCell>$202,782</ResponsiveTableCell>
                            <ResponsiveTableCell>$184,347.10</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>2</ResponsiveTableCell>
                            <ResponsiveTableCell>$202,782</ResponsiveTableCell>
                            <ResponsiveTableCell>$202,782</ResponsiveTableCell>
                            <ResponsiveTableCell>$167,588.27</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>3</ResponsiveTableCell>
                            <ResponsiveTableCell>$304,000</ResponsiveTableCell>
                            <ResponsiveTableCell>$304,000</ResponsiveTableCell>
                            <ResponsiveTableCell>$228,399.85</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>4</ResponsiveTableCell>
                            <ResponsiveTableCell>$304,000</ResponsiveTableCell>
                            <ResponsiveTableCell>$304,000</ResponsiveTableCell>
                            <ResponsiveTableCell>$207,636.23</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>5</ResponsiveTableCell>
                            <ResponsiveTableCell>$482,620</ResponsiveTableCell>
                            <ResponsiveTableCell>$482,620</ResponsiveTableCell>
                            <ResponsiveTableCell>$299,668.80</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow>
                            <ResponsiveTableCell>Salvage Value</ResponsiveTableCell>
                            <ResponsiveTableCell></ResponsiveTableCell>
                            <ResponsiveTableCell>$80,000.00</ResponsiveTableCell>
                            <ResponsiveTableCell>$49,673.71</ResponsiveTableCell>
                          </ResponsiveTableRow>
                          <ResponsiveTableRow className="bg-gray-50 dark:bg-gray-700">
                            <ResponsiveTableCell className="font-bold">Total</ResponsiveTableCell>
                            <ResponsiveTableCell className="font-bold">$1,496,184</ResponsiveTableCell>
                            <ResponsiveTableCell className="font-bold">$1,176,183.62</ResponsiveTableCell>
                            <ResponsiveTableCell className="font-bold">$773,677.59</ResponsiveTableCell>
                          </ResponsiveTableRow>
                        </ResponsiveTableBody>
                      </ResponsiveTable>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                        *At scale, with a mix of multiple server models, values may vary
                      </p>
                    </div>
                    
                    <div className="mt-8">
                      <p className="mb-4">
                        For a server ranging from 33% (at start) to 80% (at end) utilization over 5 years, key financial metrics are:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                        <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-0 shadow-sm">
                          <h4 className="text-lg font-bold mb-0 pt-1 text-gray-900 dark:text-white">Net Present Value (NPV)</h4>
                          <p className="text-4xl font-bold text-green-600 dark:text-green-500 leading-none">$773,677</p>
                        </div>
                        
                        <div className="bg-white dark:bg-gray-800 rounded-lg px-4 py-0 shadow-sm">
                          <h4 className="text-lg font-bold mb-0 pt-1 text-gray-900 dark:text-white">Internal Rate of Return (IRR)</h4>
                          <p className="text-4xl font-bold text-green-600 dark:text-green-500 leading-none">~57%</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-0">indicating robust returns</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-900 dark:text-white font-medium">
                        These metrics underscore the model's ability to deliver substantial value to token holders.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Introduction Section */}
        <div className="mt-8 pb-16">
          <div className="w-full bg-white dark:bg-gray-950 py-16">
            <div className="max-w-[1100px] mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold mb-8 font-sora text-gray-900 dark:text-white">Team Introduction</h2>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="mb-8">
                  Our leadership team brings extensive expertise in blockchain, AI, and cloud computing, with a proven history of building decentralized systems and enterprise solutions. Their combined experience ensures the technical and strategic execution of this vision. Detailed bios reinforcing confidence in our capability to succeed:
                </p>
                
                {/* Co-Founders - 2 Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Andrew Smith - Co-Founder</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      With over 20 years of experience in programming, including 13 professionally as a ML/AI & Distributed Systems engineer. Andrew previously co-founded an AI powered Data-as-a-Service business and contributed to growing that business to over 17 million in ARR, with customers that included Wells Fargo Asset Management, Broadridge Financial Services, Wisdom Tree and more. Over the last 3 years Andrew has been developing Formation Cloud which is a key strategic partner for RWAi. Formation is an orchestration protocol optimized to power an agent & model marketplace delivering private access to agents and models at cloud scale.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Wes Cowan - Co-Founder</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      With over 15 years leading successful tech start-up. Formally he developed DeFi analytics software which was acquired by Valkyrie Investments in 2021. He then went on to co-found Juice Finance, a leading DeFi protocol which reached over $500 million in TVL. Prior to his successes in tech he was a Principal at JP Morgan managing a team with over $800 million in AUM and graduated from New York University.
                    </p>
                  </div>
                </div>
                
                {/* All Other Team Members - 3 Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Benjamin Ditmant - Lead AI Engineer</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Benjamin has worked as a quantitative researcher and quantitative trader in both the traditional finance and crypto industries. He has 12 years of experience building software for technology companies and open source projects. Recently, he has been focused on building AI-powered applications. He graduated with degrees in financial mathematics from MIT, law from the Cambridge, and computer science with a focus in Artificial Intelligence from Imperial College.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Chris Johnston - Product Designer</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      A product designer bridging creativity with machine intelligence, Chris leads Applied AI and Community Relations, ensuring AI feels like an intuitive extension of human creativity. With over 15 years of experience in scalable product development, he previously directed product teams delivering custom software for venture-backed and pre-exit companies. Chris frequently contributes to South Florida PBS, translating AI advancements into accessible insights. He is pioneering "vibe coding" as a craft to create immersive, human-centered experiences.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Mitch Martin - Sr Software Engineer</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      A Sr Software Engineer with 15 years experience, including embedded systems as Lockheed Martin, Compiler Engineering at Fuel Labs, and Blockchain Engineering at Hedera Hashgraph.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Andrew Hathaway - Sr Software Engineer</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Ex. Comcast, 14 years professional experience as a Sr Software Engineer, primarily focused on scalable web applications.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Conclusion Section */}
        <div className="mt-8 pb-16">
          <div className="w-full bg-white dark:bg-gray-950 py-16">
            <div className="max-w-[1100px] mx-auto px-4 md:px-6">
              <h2 className="text-3xl font-bold mb-8 font-sora text-gray-900 dark:text-white">Conclusion</h2>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="mb-6">
                  The RWAi tokenization of AI GPU infrastructure model redefines decentralized computing, combining innovative hardware financing with advanced orchestration to deliver exceptional value. With competitive pricing, a scalable framework, and verified financials, we are well-positioned to lead the AI/Neo Cloud market. We welcome further discussion to explore this opportunity and invite you to join us in shaping the future of compute infrastructure.
                </p>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 p-6 rounded-r-lg mt-8">
                  <p className="text-lg font-medium text-gray-900 dark:text-white mb-0">
                    Sourced through RWAi's fractional ownership, deploying servers rapidly as demand grows with 0 corporate capital expenditures.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 