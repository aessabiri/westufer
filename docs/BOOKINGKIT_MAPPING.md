# Bookingkit Widget Mapping
This document tracks which Bookingkit widgets are used on which pages of the Next.js website.

## 1. Main Master Widget
| Page | Purpose | Config ID (`data-cw`) |
| :--- | :--- | :--- |
| `/booking` | Full catalog of all courses and rentals | `4b3ab0e8a85a7805e277e2b19583050a` |

## 2. Category: "Kurse" (Courses)
| Page | Widget Name | Config ID (`data-cw`) |
| :--- | :--- | :--- |
| `/kurse/windsurf` | Windsurfen | `1253e1a9a19995e6966cf2bf6d4dbd36` |
| `/kurse/sup` | SUP Liste | `7c5de4913df06914b1822818f8b69afd` |
| `/kurse/longboard` | Longboard | `b6d9d93ab89272e6717a82f6519cd4e1` |
| `/kurse/wingfoil` | Wing-Foilen | `19dcbc42fbc01b0eb7ff50cb207fb257` |
| `/kurse/kids` | Kids und co | `8e77f4d5432a8f414be964dba3c28901` |
| `/gruppen/anfrage` | Schulen & Firmen | `58ae67a2678e690811b49a941b3adc19` (Schulen) <br> `5b9c9af9a951f17cbefdae5de113c854` (Firmen) |

## 3. Category: "Verleih" (Rentals)
| Page | Widget Name | Config ID (`data-cw`) |
| :--- | :--- | :--- |
| `/verleih/windsurf` | Windsurfen | `1253e1a9a19995e6966cf2bf6d4dbd36` |
| `/verleih/sup` | SUP Liste | `7c5de4913df06914b1822818f8b69afd` |
| `/verleih/longboard` | Longboard | `b6d9d93ab89272e6717a82f6519cd4e1` |

## 4. Special: "Gutscheine" (Vouchers)
| Page | Widget Name | Config ID (`data-cw`) |
| :--- | :--- | :--- |
| `/gutscheine` | Windsurfen Gutscheine | `e489a6ef28c776963c986b462fb2afd9` |
| `/gutscheine` | SUP Gutscheine | `a146776a6a11d0371546474e885fa619` |
| `/gutscheine` | Gutscheine Longboarden | `dc7902d5a240b51f0d1c9f53e4f89125` |

---

## Technical Notes
*   **Widget Initialization:** Links in the Navbar use standard `<a>` tags to force a page refresh, which is required for the external Bookingkit scripts to re-initialize correctly.
*   **Iframe Styling:** The `BookingkitWidget` component includes a global CSS override to ensure the widgets are 100% width and responsive.
