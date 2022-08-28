import Container from '@components/container';
import ThemeSwitch from '@components/themeSwitch';
import Image from 'next/image';
import VercelLogo from 'public/vercel.svg';

export default function Footer(props: any) {
  return (
    <Container className="mt-10 border-t border-gray-100 dark:border-gray-800">
      <div className="text-sm text-center">
        Copyright © {new Date().getFullYear()} {props?.copyright}. All
        rights reserved.
      </div>
      <div className="mt-1 text-sm text-center text-gray-500 dark:text-gray-600">
        Made by hartomy.com
        {/* Do not remove above link */}
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="mt-5">
          <Image
            src={VercelLogo}
            layout="fixed"
            alt="Powered by Vercel"
            unoptimized={true}
            width="150"
            height="25"
          />
        </div>
        <ThemeSwitch />
      </div>
    </Container>
  );
}