import React from "react";
import { Mail, MapPin, Phone, Send, ShieldCheck } from "lucide-react";
import AdBanner from "@/components/AdBanner";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/30 mb-4">
          <Mail className="w-4 h-4" />
          <span>Editorial & Press Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Contact the Foot360 Desk
        </h1>
        <p className="text-base text-slate-300 mt-3 max-w-xl mx-auto leading-relaxed">
          Submit corrections, press credentials, advertising inquiries, or reach our senior tactical correspondents.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Newsroom Locations
            </h3>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">London Newsdesk</strong>
                  <span>100 Cannon Street, London, EC4N 6EU, UK</span>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white">Madrid Editorial Bureau</strong>
                  <span>Paseo de la Castellana 42, 28046 Madrid, Spain</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 text-xs text-slate-300">
            <h3 className="text-base font-bold text-white uppercase tracking-wider">
              Direct Contact Channels
            </h3>
            <p><strong>Editorial & Corrections:</strong> editorial@foot360.com</p>
            <p><strong>Press Accreditation:</strong> press@foot360.com</p>
            <p><strong>Advertising & AdSense:</strong> advertise@foot360.com</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4">
            Submit a Correction or Inquiry
          </h3>
          <form className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Your Full Name</label>
              <input
                type="text"
                placeholder="Julian Alvarez"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="name@example.com"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Inquiry Type</label>
              <select className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-emerald-500">
                <option>Factual Correction Report</option>
                <option>Editorial Feedback</option>
                <option>Press & Accreditation Inquiry</option>
                <option>Commercial / Advertising Partnership</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Message / Article URL & Details</label>
              <textarea
                rows={4}
                placeholder="Please include the article slug or headline and exact details of your query..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <button
              type="button"
              className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold flex items-center justify-center gap-2 transition shadow-lg shadow-emerald-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Send Message to Editorial Desk</span>
            </button>
          </form>
        </div>
      </div>

      <AdBanner slot="footer-banner" className="mt-12" />
    </div>
  );
}
