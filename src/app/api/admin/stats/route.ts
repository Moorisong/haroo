import { NextResponse } from 'next/server'

export async function GET() {
  // TODO: Supabase 및 AWS Cost Explorer API 연동하여 실제 데이터 수집
  return NextResponse.json({
    revenue: 8900000,
    pgFee: 222500,
    ec2Cost: 45000,
    s3Cost: 12000,
    cfCost: 8000,
    netProfit: 8612500,
    totalVisitors: 15420,
    draftUsers: 4210,
    paidUsers: 142,
    totalContainers: 142,
    runningContainers: 135,
    stoppedContainers: 7,
    waitlistCount: 342,
  })
}
