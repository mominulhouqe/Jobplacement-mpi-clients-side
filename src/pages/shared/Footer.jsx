import React from "react";
import { Paper, Typography, Grid, Link, SvgIcon } from "@mui/material";


const Footer = () => {
  const footerStyle = {
    padding: "20px",
    background: "#333", // Change the background color to your preferred color
    color: "#fff", // Change the text color to your preferred color
  };

  const footerTitleStyle = {
    fontSize: "1.2rem",
    fontWeight: "bold",
    marginBottom: "1rem",
  };

  const linkStyle = {
    color: "#fff",
    textDecoration: "none",
    marginRight: "1rem",
  };

  return (
    <div>
      <Paper style={footerStyle}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" style={footerTitleStyle}>
              Services
            </Typography>
            <Link href="#" style={linkStyle}>
              Branding
            </Link>
            <Link href="#" style={linkStyle}>
              Design
            </Link>
            <Link href="#" style={linkStyle}>
              Marketing
            </Link>
            <Link href="#" style={linkStyle}>
              Advertisement
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" style={footerTitleStyle}>
              Company
            </Typography>
            <Link href="#" style={linkStyle}>
              About us
            </Link>
            <Link href="#" style={linkStyle}>
              Contact
            </Link>
            <Link href="#" style={linkStyle}>
              Jobs
            </Link>
            <Link href="#" style={linkStyle}>
              Press kit
            </Link>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h6" style={footerTitleStyle}>
              Legal
            </Typography>
            <Link href="#" style={linkStyle}>
              Terms of use
            </Link>
            <Link href="#" style={linkStyle}>
              Privacy policy
            </Link>
            <Link href="#" style={linkStyle}>
              Cookie policy
            </Link>
          </Grid>
        </Grid>
      </Paper>
      <Paper
        style={{
          padding: "10px",
          borderTop: "1px solid #ccc",
          background: "#444", // Change the background color to your preferred color
          color: "#fff", // Change the text color to your preferred color
        }}
      >
        <Grid container alignItems="center">
          <Grid item>
            <SvgIcon
              style={{
                width: "24px",
                height: "24px",
                marginRight: "10px",
                fill: "#fff", // Change the icon color to your preferred color
              }}
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
            </SvgIcon>
            <p>
              ACME Industries Ltd. <br />
              Providing reliable tech since 1992
            </p>
          </Grid>
          <Grid item xs={12} md={4}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Link href="#" style={linkStyle}>
                <SvgIcon
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "10px",
                    fill: "#fff", // Change the icon color to your preferred color
                  }}
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </SvgIcon>
              </Link>
              <Link href="#" style={linkStyle}>
                <SvgIcon
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "10px",
                    fill: "#fff", // Change the icon color to your preferred color
                  }}
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62-4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </SvgIcon>
              </Link>
              <Link href="#" style={linkStyle}>
                <SvgIcon
                  style={{
                    width: "24px",
                    height: "24px",
                    marginRight: "10px",
                    fill: "#fff", // Change the icon color to your preferred color
                  }}
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </SvgIcon>
              </Link>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default Footer;
