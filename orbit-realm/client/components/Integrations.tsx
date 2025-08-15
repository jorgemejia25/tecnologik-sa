import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

export default function Integrations() {
  const brands = [
    {
      name: 'Microsoft',
      logo: 'https://img.icons8.com/fluency/96/microsoft.png',
      category: 'Cloud & Productivity'
    },
    {
      name: 'Dell',
      logo: 'https://img.icons8.com/color/96/dell.png',
      category: 'Hardware & Infrastructure'
    },
    {
      name: 'UniFi',
      logo: 'https://img.icons8.com/color/96/ubiquiti.png',
      category: 'Networking'
    },
    {
      name: 'VMware',
      logo: 'https://img.icons8.com/color/96/vmware.png',
      category: 'Virtualization'
    },
    {
      name: 'Veeam',
      logo: 'https://img.icons8.com/color/96/000000/veeam.png',
      category: 'Backup & Recovery'
    },
    {
      name: 'Cisco',
      logo: 'https://cdn.worldvectorlogo.com/logos/cisco-2.svg',
      category: 'Networking'
    },
    {
      name: 'Proxmox',
      logo: 'https://cdn.worldvectorlogo.com/logos/proxmox.svg',
      category: 'Virtualization'
    },
    {
      name: 'ESET',
      logo: 'https://seeklogo.com/images/E/eset-logo-E93B6D1DF9-seeklogo.com.png',
      category: 'Security'
    },
    {
      name: 'Fortinet',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Fortinet_logo.svg',
      category: 'Cybersecurity'
    }
  ];

  const certifications = [
    {
      name: 'AWS Certified',
      description: 'Amazon Web Services Cloud Certification',
      badge: 'AWS'
    },
    {
      name: 'Google Cloud Certified',
      description: 'Google Cloud Platform Certification',
      badge: 'GCP'
    },
    {
      name: 'Microsoft Certified',
      description: 'Microsoft Azure and Technologies',
      badge: 'MS'
    },
    {
      name: 'CISA',
      description: 'Certified Information Systems Auditor',
      badge: 'CISA'
    },
    {
      name: 'Certiprof',
      description: 'Professional Certification Standards',
      badge: 'CPF'
    },
    {
      name: 'ISO Certified',
      description: 'International Organization for Standardization',
      badge: 'ISO'
    },
    {
      name: 'ITIL Certified',
      description: 'IT Infrastructure Library Best Practices',
      badge: 'ITIL'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="integraciones" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Integrations Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            <span className="gradient-text">Integraciones</span> con Marcas Líderes
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Trabajamos con las principales tecnologías del mercado para ofrecerte 
            soluciones robustas y confiables.
          </p>
        </motion.div>

        <div className="flex justify-center mb-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 max-w-5xl"
          >
            {brands.map((brand, index) => (
              <motion.div
                key={brand.name}
                variants={itemVariants}
                className="group relative bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center h-full">
                  <div className="w-20 h-20 mb-6 flex items-center justify-center">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.nextElementSibling.style.display = 'flex';
                      }}
                    />
                    <div
                      className="hidden w-full h-full bg-tech-primary/10 rounded-lg items-center justify-center"
                      style={{ display: 'none' }}
                    >
                      <span className="font-bold text-tech-primary text-sm">{brand.name}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 text-base">{brand.name}</h3>
                  <p className="text-sm text-muted-foreground">{brand.category}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4" id="certificaciones">
            <span className="gradient-text">Certificaciones</span> y Estándares
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Nuestro equipo cuenta con las certificaciones más importantes del sector 
            para garantizar la excelencia en cada proyecto.
          </p>
        </motion.div>

        <div className="flex justify-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-6xl"
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                variants={itemVariants}
                className="relative bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg p-6 border border-blue-200/50 hover:border-tech-primary/30 transition-colors duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-tech-primary/10 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-tech-primary">{cert.badge}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-tech-primary" />
                      <span className="text-xs text-tech-primary font-medium">Certificado</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-tech-primary/5 to-tech-accent/5 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-foreground mb-4">
              Compromiso con la Excelencia
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Nuestro equipo se mantiene actualizado con las últimas certificaciones y 
              mejores prácticas del sector, garantizando que siempre recibas soluciones 
              basadas en los estándares más altos de la industria.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
