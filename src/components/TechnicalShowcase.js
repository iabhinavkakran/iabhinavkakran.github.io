import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaCode, FaRocket, FaShieldAlt, FaCogs } from 'react-icons/fa';
import '../styles/TechnicalShowcase.css';

const showcases = [
  {
    id: 'architecture',
    icon: <FaCogs />,
    title: "Clean Architecture",
    description: "Microservices pattern with dependency injection and separation of concerns",
    language: "java",
    code: `// Payment Service with Clean Architecture
@Service
public class RefundService {
    private final PaymentGateway paymentGateway;
    private final OrderRepository orderRepository;
    private final EventPublisher eventPublisher;

    @Autowired
    public RefundService(
        PaymentGateway paymentGateway,
        OrderRepository orderRepository,
        EventPublisher eventPublisher
    ) {
        this.paymentGateway = paymentGateway;
        this.orderRepository = orderRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public RefundResult processRefund(RefundRequest request) {
        // Validate order eligibility
        Order order = orderRepository.findById(request.getOrderId())
            .orElseThrow(() -> new OrderNotFoundException());
        
        validateRefundEligibility(order);

        // Process payment through gateway
        PaymentResult result = paymentGateway.initiateRefund(
            order.getPaymentId(),
            request.getAmount()
        );

        // Update order status
        order.markAsRefunded(result.getTransactionId());
        orderRepository.save(order);

        // Publish event for downstream services
        eventPublisher.publish(new RefundProcessedEvent(order));

        return RefundResult.success(result);
    }

    private void validateRefundEligibility(Order order) {
        if (!order.isRefundable()) {
            throw new RefundNotAllowedException(
                "Order is not eligible for refund"
            );
        }
    }
}`,
    explanation: "Demonstrates dependency injection, single responsibility principle, and transactional consistency in a production refund system."
  },
  {
    id: 'performance',
    icon: <FaRocket />,
    title: "Performance Optimization",
    description: "High-throughput webhook processing with Redis caching and async patterns",
    language: "javascript",
    code: `// Trading Algorithm Webhook Handler
class TradingWebhookHandler {
    constructor(redisClient, tradingEngine, metrics) {
        this.redis = redisClient;
        this.engine = tradingEngine;
        this.metrics = metrics;
    }

    async processWebhook(webhookData) {
        const startTime = Date.now();

        try {
            // Idempotency check using Redis
            const isDuplicate = await this.checkDuplicate(
                webhookData.requestId
            );
            if (isDuplicate) {
                this.metrics.incrementDuplicates();
                return { status: 'duplicate', processed: false };
            }

            // Cache frequently accessed market data
            const marketData = await this.getCachedMarketData(
                webhookData.symbol
            );

            // Async processing - don't block webhook response
            this.processTradeAsync(webhookData, marketData);

            this.metrics.recordLatency(Date.now() - startTime);
            return { status: 'accepted', processed: true };

        } catch (error) {
            this.metrics.incrementErrors();
            throw error;
        }
    }

    async checkDuplicate(requestId) {
        const key = \`webhook:\${requestId}\`;
        const exists = await this.redis.exists(key);
        
        if (!exists) {
            // Set with 24h expiry to prevent duplicates
            await this.redis.setex(key, 86400, '1');
            return false;
        }
        return true;
    }

    async getCachedMarketData(symbol) {
        const cacheKey = \`market:\${symbol}\`;
        const cached = await this.redis.get(cacheKey);

        if (cached) {
            this.metrics.incrementCacheHits();
            return JSON.parse(cached);
        }

        // Cache miss - fetch and store
        const data = await this.fetchMarketData(symbol);
        await this.redis.setex(cacheKey, 60, JSON.stringify(data));
        this.metrics.incrementCacheMisses();
        
        return data;
    }

    processTradeAsync(webhookData, marketData) {
        // Fire and forget - process in background
        setImmediate(async () => {
            try {
                await this.engine.executeTrade({
                    signal: webhookData.signal,
                    symbol: webhookData.symbol,
                    marketData: marketData,
                    timestamp: webhookData.timestamp
                });
            } catch (error) {
                // Log error and trigger alert
                console.error('Trade execution failed:', error);
                this.metrics.incrementTradeFailures();
            }
        });
    }
}`,
    explanation: "Reduces latency by 70% using Redis caching, idempotency patterns, and async processing for 50K+ daily webhook calls."
  },
  {
    id: 'security',
    icon: <FaShieldAlt />,
    title: "Security Implementation",
    description: "Multi-layer authentication with JWT, token rotation, and request signing",
    language: "javascript",
    code: `// Secure API Integration Middleware
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

class SecurityMiddleware {
    constructor(config) {
        this.jwtSecret = config.jwtSecret;
        this.encryptionKey = config.encryptionKey;
        this.tokenRotationInterval = 3600000; // 1 hour
    }

    // Verify webhook signature from third-party platforms
    verifyWebhookSignature(req, res, next) {
        const signature = req.headers['x-signature'];
        const timestamp = req.headers['x-timestamp'];

        // Prevent replay attacks
        if (Date.now() - timestamp > 300000) { // 5 min window
            return res.status(401).json({ 
                error: 'Request expired' 
            });
        }

        // Verify HMAC signature
        const payload = timestamp + JSON.stringify(req.body);
        const expectedSignature = crypto
            .createHmac('sha256', this.encryptionKey)
            .update(payload)
            .digest('hex');

        if (!crypto.timingSafeEqual(
            Buffer.from(signature),
            Buffer.from(expectedSignature)
        )) {
            return res.status(401).json({ 
                error: 'Invalid signature' 
            });
        }

        next();
    }

    // JWT authentication with automatic token rotation
    authenticateJWT(req, res, next) {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ 
                error: 'No token provided' 
            });
        }

        try {
            const decoded = jwt.verify(token, this.jwtSecret);

            // Check if token needs rotation
            if (this.shouldRotateToken(decoded)) {
                const newToken = this.generateToken(decoded.userId);
                res.setHeader('X-New-Token', newToken);
            }

            req.user = decoded;
            next();

        } catch (error) {
            return res.status(403).json({ 
                error: 'Invalid or expired token' 
            });
        }
    }

    generateToken(userId, expiresIn = '1h') {
        return jwt.sign(
            { 
                userId, 
                iat: Date.now(),
                jti: crypto.randomBytes(16).toString('hex')
            },
            this.jwtSecret,
            { expiresIn }
        );
    }

    shouldRotateToken(decoded) {
        return Date.now() - decoded.iat > this.tokenRotationInterval;
    }

    // Encrypt sensitive data before storage
    encryptData(data) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(
            'aes-256-gcm',
            Buffer.from(this.encryptionKey, 'hex'),
            iv
        );

        let encrypted = cipher.update(
            JSON.stringify(data),
            'utf8',
            'hex'
        );
        encrypted += cipher.final('hex');

        const authTag = cipher.getAuthTag();

        return {
            encrypted,
            iv: iv.toString('hex'),
            authTag: authTag.toString('hex')
        };
    }

    decryptData(encryptedData) {
        const decipher = crypto.createDecipheriv(
            'aes-256-gcm',
            Buffer.from(this.encryptionKey, 'hex'),
            Buffer.from(encryptedData.iv, 'hex')
        );

        decipher.setAuthTag(
            Buffer.from(encryptedData.authTag, 'hex')
        );

        let decrypted = decipher.update(
            encryptedData.encrypted,
            'hex',
            'utf8'
        );
        decrypted += decipher.final('utf8');

        return JSON.parse(decrypted);
    }
}

module.exports = SecurityMiddleware;`,
    explanation: "Production-grade security with HMAC signature verification, replay attack prevention, AES-256 encryption, and automatic token rotation."
  },
  {
    id: 'testing',
    icon: <FaCode />,
    title: "Testing Approach",
    description: "Comprehensive testing with unit tests, integration tests, and mocking",
    language: "javascript",
    code: `// Comprehensive Testing Strategy
const { describe, it, expect, jest } = require('@jest/globals');
const RefundService = require('./RefundService');

describe('RefundService', () => {
    let refundService;
    let mockPaymentGateway;
    let mockOrderRepository;
    let mockEventPublisher;

    beforeEach(() => {
        // Setup mocks with clear behavior
        mockPaymentGateway = {
            initiateRefund: jest.fn()
        };

        mockOrderRepository = {
            findById: jest.fn(),
            save: jest.fn()
        };

        mockEventPublisher = {
            publish: jest.fn()
        };

        refundService = new RefundService(
            mockPaymentGateway,
            mockOrderRepository,
            mockEventPublisher
        );
    });

    describe('processRefund', () => {
        it('should process refund successfully for valid order', async () => {
            // Arrange
            const orderId = '12345';
            const mockOrder = {
                id: orderId,
                paymentId: 'pay_123',
                status: 'delivered',
                isRefundable: () => true,
                markAsRefunded: jest.fn()
            };

            mockOrderRepository.findById.mockResolvedValue(mockOrder);
            mockPaymentGateway.initiateRefund.mockResolvedValue({
                success: true,
                transactionId: 'txn_789'
            });

            // Act
            const result = await refundService.processRefund({
                orderId,
                amount: 100.00
            });

            // Assert
            expect(result.success).toBe(true);
            expect(mockPaymentGateway.initiateRefund)
                .toHaveBeenCalledWith('pay_123', 100.00);
            expect(mockOrder.markAsRefunded)
                .toHaveBeenCalledWith('txn_789');
            expect(mockEventPublisher.publish)
                .toHaveBeenCalledWith(
                    expect.objectContaining({
                        type: 'RefundProcessed',
                        orderId: orderId
                    })
                );
        });

        it('should throw error for non-existent order', async () => {
            // Arrange
            mockOrderRepository.findById.mockResolvedValue(null);

            // Act & Assert
            await expect(
                refundService.processRefund({
                    orderId: 'invalid',
                    amount: 100.00
                })
            ).rejects.toThrow('OrderNotFoundException');
        });

        it('should handle payment gateway failures gracefully', async () => {
            // Arrange
            const mockOrder = {
                id: '12345',
                paymentId: 'pay_123',
                isRefundable: () => true
            };

            mockOrderRepository.findById.mockResolvedValue(mockOrder);
            mockPaymentGateway.initiateRefund.mockRejectedValue(
                new Error('Gateway timeout')
            );

            // Act & Assert
            await expect(
                refundService.processRefund({
                    orderId: '12345',
                    amount: 100.00
                })
            ).rejects.toThrow('Gateway timeout');

            // Verify rollback behavior
            expect(mockEventPublisher.publish).not.toHaveBeenCalled();
        });
    });
});`,
    explanation: "Demonstrates TDD practices with comprehensive test coverage, proper mocking, and edge case handling for production systems."
  }
];

const CodeBlock = ({ code, language }) => {
  return (
    <div className="code-block">
      <pre>
        <code className={`language-${language}`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

const ShowcaseCard = ({ showcase, isActive, onClick }) => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className={`showcase-card ${isActive ? 'active' : ''}`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="showcase-icon">{showcase.icon}</div>
      <h3>{showcase.title}</h3>
      <p>{showcase.description}</p>
    </motion.div>
  );
};

const TechnicalShowcase = () => {
  const [activeShowcase, setActiveShowcase] = useState(showcases[0]);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="technical-showcase" className="technical-showcase">
      <motion.div
        className="showcase-header"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="section-title">Code Quality & Architecture</h2>
        <p className="section-subtitle">
          Clean code, scalable architecture, and production-ready solutions
        </p>
      </motion.div>

      <div ref={ref} className="showcase-content">
        <div className="showcase-grid">
          {showcases.map((showcase) => (
            <ShowcaseCard
              key={showcase.id}
              showcase={showcase}
              isActive={activeShowcase.id === showcase.id}
              onClick={() => setActiveShowcase(showcase)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeShowcase.id}
            className="code-display"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="code-header">
              <h3>{activeShowcase.title}</h3>
              <span className="language-badge">{activeShowcase.language}</span>
            </div>
            <CodeBlock 
              code={activeShowcase.code} 
              language={activeShowcase.language} 
            />
            <div className="code-explanation">
              <strong>Key Takeaway:</strong> {activeShowcase.explanation}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default TechnicalShowcase;
