'use client'

import React from 'react'
import { GlassCard } from '@/components/cards/GlassCard'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{
    error?: Error
    resetError: () => void
    errorInfo?: React.ErrorInfo
  }>
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // In production, you might want to send this to an error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Send to error reporting service (e.g., Sentry, LogRocket, etc.)
      // reportError(error, errorInfo)
    }

    this.setState({ hasError: true, error, errorInfo })
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  render() {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback
        return <FallbackComponent
          error={this.state.error}
          resetError={this.resetError}
          errorInfo={this.state.errorInfo}
        />
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <GlassCard className="max-w-lg w-full text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white mb-2">Oops! Something went wrong</h2>
                <p className="text-white/70 text-sm mb-4">
                  We encountered an unexpected error. This has been logged and we're working to fix it.
                </p>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-slate-800/50 p-3 rounded text-left text-xs text-red-300 max-h-40 overflow-y-auto w-full">
                  <strong>Error:</strong> {this.state.error.message}
                  {this.state.errorInfo?.componentStack && (
                    <div className="mt-2">
                      <strong>Component Stack:</strong>
                      <pre className="whitespace-pre-wrap mt-1">{this.state.errorInfo.componentStack}</pre>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={this.resetError}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </button>

                <button
                  onClick={() => window.location.href = '/'}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Go Home
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      )
    }

    return this.props.children
  }
}

// Hook-based error boundary for functional components and async operations
export const useErrorHandler = () => {
  return (error: Error, errorInfo?: { componentStack?: string }) => {
    console.error('useErrorHandler caught error:', error, errorInfo)

    // Could trigger error boundary or show toast notification
    // For now, just log it. In real app, might show user-friendly message
  }
}

// Async error wrapper
export const asyncErrorHandler = (fn: (...args: any[]) => Promise<any>) => {
  return async (...args: any[]) => {
    try {
      return await fn(...args)
    } catch (error) {
      console.error('Async error:', error)

      // In production, might show generic error message
      throw error // Re-throw so component can handle it
    }
  }
}
