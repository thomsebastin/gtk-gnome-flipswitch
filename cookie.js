#!/usr/bin/gjs

const Gtk = imports.gi.Gtk;
const Lang = imports.lang;

// We start out with 0 cookies
var cookies = 0;

const GettingTheSignal = new Lang.Class({
    Name: 'Getting the Signal',

    // Create the application itself
    _init: function() {
        this.application = new Gtk.Application();

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', Lang.bind(this, this._onActivate));
        this.application.connect('startup', Lang.bind(this, this._onStartup));
    },

    // Callback function for 'activate' signal presents window when active
    _onActivate: function() {
        this._window.present();
    },

    // Callback function for 'startup' signal builds the UI
    _onStartup: function() {
        this._buildUI ();
    },

    // Build the application's UI
    _buildUI: function() {
        // Create the application window
        this._window = new Gtk.ApplicationWindow({
            application: this.application,
            window_position: Gtk.WindowPosition.CENTER,
            default_height: 200,
            default_width: 400,
            title: "Click the button to get a cookie!"});

        // Create the label
        this._cookieLabel = new Gtk.Label ({
            label: "Number of cookies: " + cookies });

        // Create the cookie button
        this._cookieButton = new Gtk.Button ({ label: "Get a cookie" });

        // Create the switch that controls whether or not you can win
        this._cookieSwitch = new Gtk.Switch ();

        // Create the label to go with the switch
        this._switchLabel = new Gtk.Label ({
            label: "Cookie dispenser" });

        // Create a grid for the switch and its label
        this._switchGrid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER });

        // Put the switch and its label inside that grid
        this._switchGrid.attach (this._switchLabel, 0, 0, 1, 1);
        this._switchGrid.attach (this._cookieSwitch, 1, 0, 1, 1);

        // Connect the cookie button to the function that handles clicking it
        this._cookieButton.connect ('clicked', Lang.bind (this, this._getACookie));

        // Create a grid to arrange everything inside
        this._grid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER,
            row_spacing: 20 });

        // Put everything inside the grid
        this._grid.attach (this._cookieButton, 0, 0, 1, 1);
        this._grid.attach (this._switchGrid, 0, 1, 1, 1);
        this._grid.attach (this._cookieLabel, 0, 2, 1, 1);

        // Add the grid to the window
        this._window.add (this._grid);

        // Show the window and all child widgets
        this._window.show_all();

    },

    _getACookie: function() {

        // Is the cookie dispenser turned on?
        if (this._cookieSwitch.get_active()) {

            // Increase the number of cookies by 1 and update the label
            cookies++;
            this._cookieLabel.set_label ("Number of cookies: " + cookies);

        } 

    }

});

// Run the application
let app = new GettingTheSignal ();
app.application.run (ARGV);