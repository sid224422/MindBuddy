import React from 'react';
import { Phone, Mail, Globe, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-dark-green text-light-orange py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Emergency Contacts */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Emergency Contacts</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>NIMHANS: 080-26991519</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Aasra: 9820466726</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>Sneha: 044-24640050</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-light-orange/80 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-light-orange/80 transition-colors">Resources</a></li>
              <li><a href="#" className="hover:text-light-orange/80 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-light-orange/80 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <a href="mailto:support@mindbuddy.com" className="hover:text-light-orange/80 transition-colors">
                  support@mindbuddy.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <a href="https://mindbuddy.com" className="hover:text-light-orange/80 transition-colors">
                  www.mindbuddy.com
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Disclaimer</h3>
            <p className="text-light-orange/80 text-sm">
              In case of emergency, please contact your local emergency services immediately. 
              This platform is not a substitute for professional medical advice, diagnosis, or treatment.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-light-orange/20 text-center">
          <p className="flex items-center justify-center gap-2">
            Made with <Heart className="w-4 h-4" /> by MindBuddy Team
          </p>
        </div>
      </div>
    </footer>
  );
};