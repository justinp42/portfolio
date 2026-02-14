import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [formData, setFormData] = useState({
    from_name: '',
    reply_to: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      console.log('EmailJS not configured. Form data:', formData);
      setStatus('success');
      setFormData({ from_name: '', reply_to: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
      return;
    }

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setStatus('success');
      setFormData({ from_name: '', reply_to: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const fields = [
    { name: 'from_name', label: 'Name', type: 'text', placeholder: 'Your name' },
    { name: 'reply_to', label: 'Email', type: 'email', placeholder: 'you@example.com' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-warm-linen">
      <div className="container-custom">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="section-label"
          >
            Contact
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Copy */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="font-heading text-4xl font-bold text-espresso mb-6">
                Let's build something together
              </h2>
              <p className="font-serif text-lg text-warm-dark leading-relaxed mb-10">
                I'm always open to new opportunities, interesting projects, and good
                conversations. Whether you have something specific in mind or just want
                to say hello — I'd love to hear from you.
              </p>

              <div className="space-y-3 font-mono text-sm">
                <a
                  href="mailto:jhpham05@gmail.com"
                  className="block text-warm-dark underline-grow hover:text-sage transition-colors w-fit"
                >
                  jhpham05@gmail.com
                </a>
                <a
                  href="https://github.com/justinp42"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-warm-dark underline-grow hover:text-sage transition-colors w-fit"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/justinpham5/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-warm-dark underline-grow hover:text-sage transition-colors w-fit"
                >
                  LinkedIn
                </a>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {fields.map((field, i) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                  >
                    <label
                      htmlFor={field.name}
                      className="block font-mono text-sm text-clay mb-2"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      required
                      placeholder={field.placeholder}
                      className="w-full px-4 py-3 bg-cream border border-straw rounded-lg font-serif text-warm-dark placeholder:text-clay/50 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-200"
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <label
                    htmlFor="message"
                    className="block font-mono text-sm text-clay mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Tell me about your project or just say hello"
                    className="w-full px-4 py-3 bg-cream border border-straw rounded-lg font-serif text-warm-dark placeholder:text-clay/50 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-200 resize-none"
                  />
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.55 }}
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full bg-sage text-white py-3 px-6 rounded-lg font-mono text-sm font-medium transition-all duration-300 hover:bg-sage-dark hover:shadow-md disabled:opacity-60"
                >
                  {status === 'idle' && 'Send message'}
                  {status === 'sending' && (
                    <motion.span
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      Sending...
                    </motion.span>
                  )}
                  {status === 'success' && (
                    <span className="text-white">Message sent!</span>
                  )}
                  {status === 'error' && (
                    <span className="text-white">Something went wrong — try again</span>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
