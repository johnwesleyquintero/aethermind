import { atom } from 'nanostores';
import { logStore } from './logs';

interface PerformanceMetrics {
  pageLoad: number;
  memoryUsage: number;
  memoryAllocation: number; // Track memory growth
  fps: number;
  timestamp: number;
  domNodes: number;
  eventListeners: number;
  networkLatency?: number;
  requestCount: number;
  failedRequests: number;
}

interface ResourceMetrics {
  totalResources: number;
  totalSize: number;
  loadTime: number;
}

const PERFORMANCE_THRESHOLDS = {
  memoryGrowth: 1000000, // 1MB
  fps: 30,
  latency: 1000, // 1 second
  errorRate: 0.1 // 10% error rate
};

export const metricsStore = atom<{
  performance: PerformanceMetrics[];
  resources: ResourceMetrics;
}>({
  performance: [],
  resources: {
    totalResources: 0,
    totalSize: 0,
    loadTime: 0
  }
});

export async function trackPerformance() {
  const previousMetrics = metricsStore.get().performance;
  const memoryGrowth = previousMetrics.length > 0 
    ? ((performance as any).memory?.usedJSHeapSize || 0) - previousMetrics[previousMetrics.length - 1].memoryUsage
    : 0;

  // Track network performance
  const networkMetrics = await measureNetworkPerformance();
  
  const metrics: PerformanceMetrics = {
    pageLoad: performance.now(),
    memoryUsage: (performance as any).memory?.usedJSHeapSize || 0,
    memoryAllocation: memoryGrowth,
    fps: calculateFPS(),
    timestamp: Date.now(),
    domNodes: document.getElementsByTagName('*').length,
    eventListeners: getEventListenerCount(),
    ...networkMetrics
  };

  // Check performance thresholds
  checkPerformanceThresholds(metrics);

  if (memoryGrowth > 1000000) { // 1MB growth threshold
    logStore.logWarning('Potential memory leak detected', {
      growth: memoryGrowth,
      totalMemory: metrics.memoryUsage
    });
  }

  metricsStore.set({
    ...metricsStore.get(),
    performance: [...metricsStore.get().performance, metrics].slice(-100) // Keep last 100 entries
  });
}

async function measureNetworkPerformance() {
  const entries = performance.getEntriesByType('resource');
  const requests = entries.filter(entry => entry.entryType === 'resource');
  
  const failedRequests = requests.filter(req => !req.responseEnd).length;
  const avgLatency = requests.reduce((acc, req) => acc + req.duration, 0) / requests.length;

  return {
    networkLatency: avgLatency || 0,
    requestCount: requests.length,
    failedRequests
  };
}

function checkPerformanceThresholds(metrics: PerformanceMetrics) {
  if (metrics.memoryAllocation > PERFORMANCE_THRESHOLDS.memoryGrowth) {
    logStore.logWarning('High memory growth detected', { growth: metrics.memoryAllocation });
  }
  if (metrics.fps < PERFORMANCE_THRESHOLDS.fps) {
    logStore.logWarning('Low FPS detected', { fps: metrics.fps });
  }
  if (metrics.networkLatency > PERFORMANCE_THRESHOLDS.latency) {
    logStore.logWarning('High network latency', { latency: metrics.networkLatency });
  }
  if (metrics.failedRequests / metrics.requestCount > PERFORMANCE_THRESHOLDS.errorRate) {
    logStore.logWarning('High network error rate', {
      failed: metrics.failedRequests,
      total: metrics.requestCount
    });
  }
}

function calculateFPS(): number {
  const times: number[] = [];
  let fps = 0;
  
  function refresh(now: number) {
    times.push(now);
    if (times.length > 10) {
      fps = Math.round((1000 * 10) / (now - times[0]));
      times.shift();
    }
    requestAnimationFrame(refresh);
  }
  
  requestAnimationFrame(refresh);
  return fps;
}

function getEventListenerCount(): number {
  const elements = document.getElementsByTagName('*');
  let count = 0;
  for (const el of elements) {
    count += getEventListeners(el)?.length || 0;
  }
  return count;
}
