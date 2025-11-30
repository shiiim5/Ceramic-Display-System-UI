import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrls: ['./home-component.css'],
})
export class HomeComponent {
features = [
    {
      title: 'Modular System',
      description: 'Flexible configurations that adapt to any space. Mix and match display units effortlessly.'
    },
    {
      title: 'Smart Inventory',
      description: 'Track your ceramic collections in real-time with integrated inventory management.'
    },
    {
      title: 'Multi-Level Display',
      description: 'Showcase tiles and ceramics at optimal viewing angles with our tiered display technology.'
    }
  ];

  plans = [
    {
      name: 'Starter',
      price: '$299',
      features: ['Up to 50 SKUs', 'Basic Analytics', 'Email Support', '2 Display Units'],
      popular: false
    },
    {
      name: 'Professional',
      price: '$599',
      features: ['Up to 200 SKUs', 'Advanced Analytics', 'Priority Support', '5 Display Units', 'Custom Branding'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$1,299',
      features: ['Unlimited SKUs', 'Real-time Analytics', '24/7 Phone Support', 'Unlimited Units', 'White Label', 'API Access'],
      popular: false
    }
  ];

  testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Owner, Artisan Tiles Co.',
      text: 'CeraDisplay transformed our showroom. Sales increased by 40% in the first quarter!'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Manager, Premium Ceramics',
      text: 'The inventory management alone is worth it. We\'ve eliminated stock confusion completely.'
    },
    {
      name: 'Emily Thompson',
      role: 'Director, Tile Gallery',
      text: 'Beautiful, functional, and our customers love browsing our displays now. Highly recommend!'
    }
  ];

}
