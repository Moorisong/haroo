export class AwsProvisioner {
  /**
   * EC2 인스턴스 자동 스케일 업/다운 및 컨테이너 프로비저닝 트리거
   */
  static async provision(subdomain: string, tier: string) {
    // TODO: AWS SDK (e.g., ECS, EC2) 연동
    console.log(`[AWS Provisioner] 도메인 ${subdomain} (${tier}) 프로비저닝 시작`)
    
    // 5단계 배포 시뮬레이션
    return {
      status: 'success',
      endpoint: `https://${subdomain}.haroo.site`,
      instanceId: 'i-mock12345'
    }
  }

  /**
   * 컨테이너 중지 (구독 만료, 환불 시)
   */
  static async stopContainer(projectId: string) {
    console.log(`[AWS Provisioner] 프로젝트 ${projectId} 컨테이너 중지`)
    return { status: 'stopped' }
  }
}
